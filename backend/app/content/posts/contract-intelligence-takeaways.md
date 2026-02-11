---
id: contract-intelligence-takeaways
category: Tech
title: Contract Intelligence Takeaways
excerpt: "What I tried, what broke, and what I'd do next: experiments with long-context LLMs, the Middle Ignorance problem, and designing a chunk-then-aggregate architecture with an LLM Judge."
date: 2026-02-12
featured: true
---

While building the **MSA Metadata Extractor** (a contract intelligence system that pulls structured metadata from MSAs, NDAs, and service agreements), I ran into a problem that single-context extraction couldn't fix: **long contracts**. This post is about the experiments I ran, the lessons I took away, and the architecture I'm convinced is the right next step — **semantic chunking plus aggregation**, with an **LLM as Judge**.

---

## What I Built First (and Where It Breaks)

Production today is a **hybrid multimodal** pipeline: we send PDFs (and sometimes DOCX) through a coordinator that treats text pages as text and image pages as images, then run **Gemini Vision** for extraction and **template-based validation** in a single flow. It works well for typical-length agreements and for "Frankenstein" docs (digital text plus scanned signature pages). The trade-off we accepted: **one big context** per document (or per section) and validation baked into the same prompt to save latency.

The moment we pushed that design onto **50+ page contracts**, we saw a pattern I started calling **"Middle Ignorance"**: the model would nail the preamble and the signature block but **miss or invent** things in the middle — e.g. liability caps in Section 14, termination clauses buried in amendments. We'd get high confidence scores on answers that were **wrong**. That's the failure mode that matters most in contract extraction: **confident hallucinations**, not "I don't know."

So I started experimenting with ways to reduce that risk without throwing away what already worked.

---

## Experiment 1: Bigger Context vs. Smarter Chunking

**What I tried:** First I tried feeding more of the document in one go (larger context, better chunking by page count). Result: **middle sections were still under-weighted**. The model behaved as if it was attending more to the start and end of the context; the middle was where errors and hallucinations showed up.

**Lesson:** Naive "more context" or "split by N pages" doesn't fix the problem. You need the model to **see the middle as first-class**. That pushed me toward **semantic boundaries** instead of arbitrary ones: split by **sections** (e.g. "Indemnification", "Fees", "Termination") so that each chunk is a coherent unit and the model isn't guessing where one idea ends and another begins.

---

## Experiment 2: One Shot vs. Many Candidates

**What I tried:** I ran extractions **per semantic chunk** and compared a single "best" answer per field vs. **keeping multiple candidates** (one or more per chunk) and deferring the final choice.

**Lesson:** Keeping **candidates** and choosing later was a big win. When we had only one answer per field from one big call, we had no way to reconcile conflicting signals. When we had **candidates with provenance** (which chunk they came from), we could:
- See when the model was contradicting itself across chunks.
- Feed those candidates plus **context** into a second step to decide the final value.

That second step is what I started calling the **LLM-as-Judge**: a separate call that takes the candidates and their surrounding text and **selects or synthesizes** the best answer, with an explicit **confidence score**. Giving the Judge **context around each candidate** (not just the raw string) cut down hallucinations a lot in my tests — the Judge could reject "this looks like it came from the wrong section."

---

## Experiment 3: Extraction and Validation in One Call vs. Separate

**What I tried:** In production we had merged extraction and validation into one prompt (ADR-0003) to save an API call and latency. In experiments I **split** them: extraction first, then a validator that could **reject** and return **structured feedback** (e.g. "Termination Date is missing", "Liability Cap doesn't match template").

**Lesson:** **Splitting extraction and validation** is worth the extra call. The validator becomes a **feedback signal** for an agent loop: "retry with this guidance" instead of "accept or flag." The critical constraint: **max retries**. I never let the loop run unbounded; after N attempts we **stop and send to human review**. That keeps the system predictable and avoids silent infinite retries.

---

## The Architecture I'm Betting On: Chunk → Candidates → Judge → (Optional) Agent Loop

Putting it together, the architecture I'd implement next is:

1. **Semantic chunking** — Split the document by **section boundaries** (headings, structure), not by page count. Each chunk is a meaningful unit (e.g. one clause or one section).

2. **Candidate generation** — Run extraction **per chunk** (or per group of chunks) and collect **candidates per field** with provenance (chunk id, snippet).

3. **LLM Judge** — One dedicated call per field (or per group of fields) that takes **candidates + context** and:
   - Picks the best candidate or synthesizes from several.
   - Outputs a **confidence score** and short reasoning.

4. **Validation as feedback (agentic loop)** — A separate validation step that can **reject** the Judge's output and ask for a retry with specific feedback; **MAX_RETRIES** then hand off to humans.

This is the **semantic chunking + aggregation** design: chunk for coverage, aggregate with a Judge for consistency and lower hallucinations, and use validation as a control loop rather than a one-way gate.

---

## Innovations and Non-Negotiables

**Innovations I care about most:**
- **Semantic chunking** as the unit of work, not pages or tokens.
- **Explicit candidate list** with provenance so the Judge (and humans) can see where answers came from.
- **Judge with context** — the Judge sees the candidate *and* the surrounding text, not just the extracted string.
- **Validation as feedback** with a **hard cap on retries** so we never loop forever.

**Non-negotiable for production:** In high-stakes contract extraction, a **false positive** (confident wrong answer) is unacceptable. A **false negative** (low confidence, flag for review) is acceptable. So evals and QC have to **stress-test for hallucinations**: e.g. "model confidently extracted a liability cap that doesn't exist" must count as a failure. **Accuracy of what we output** matters more than extracting every field.

---

## What's Still in Production (and Why)

We didn't rip out the current system. It's still **multimodal by default** (Gemini Vision) because text-only models failed on scanned signature pages; we accepted the cost for reliability on signatories. We kept **hybrid extraction** (text vs. image pages) because it handles mixed PDFs better than a single mode. The refactor I'm describing is about **how we run extraction and validation** (chunk → candidates → Judge → validation loop), not about replacing the existing PDF/image pipeline. The codebase is modular — you can swap the LLM client or the chunking strategy without breaking the API.

---

## Summary

My main takeaway from the MSA extractor work: **one-shot extraction over a giant context is the wrong default for long contracts.** Semantic chunking plus **candidate generation** and an **LLM Judge** that sees context gave me the biggest gain in experiments. Splitting extraction and validation and adding a **bounded agent loop** is the next step I'd take. If you're building something similar, I'd start there — and I'd make sure your evals treat **confident wrong** as the failure mode you optimize against.
