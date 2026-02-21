---
id: contract-intelligence-takeaways
category: Tech
title: Contract Intelligence Takeaways
excerpt: Lessons from building the MSA Metadata Extractor—document-as-knowledge-graph, semantic chunking, multi-LLM calls (extract + Judge), validation loops, and the Middle Ignorance problem.
date: 2026-02-12
featured: true
---

While building the MSA Metadata Extractor—a contract intelligence system that extracts structured metadata from MSAs, NDAs, and service agreements—I ran into a problem that single-context extraction couldn't fix: long contracts. The same ideas show up in another project of mine, the [Semantic Topic Mapper](https://github.com/keerthanvenkata/semantic-topic-mapper): treat the document as a knowledge graph—topic hierarchies, section boundaries, cross-references, entity relationships—and use that structure to drive chunking, multi-LLM calls, and validation loops. This post is about the experiments I ran, the lessons I took away, and how that graph-plus-pipeline architecture fits together.

## The Challenge

Production today is a hybrid multimodal pipeline: we send PDFs (and sometimes DOCX) through a coordinator that treats text pages as text and image pages as images, then run Gemini Vision for extraction and template-based validation in a single flow. It works well for typical-length agreements and for "Frankenstein" docs (digital text plus scanned signature pages). The moment we pushed that design onto 50+ page contracts, we saw a pattern I started calling "Middle Ignorance": the model would nail the preamble and the signature block but miss or invent things in the middle—e.g. liability caps in Section 14, termination clauses buried in amendments. We'd get high confidence scores on answers that were wrong. That's the failure mode that matters most in contract extraction: confident hallucinations, not "I don't know."

## Key Learnings

### 1. Treat the Document as a Knowledge Graph (Then Chunk by It)

In the Semantic Topic Mapper I extract topic hierarchies, entity relationships, and cross-references from complex documents—effectively building a small knowledge graph over the text. That same mindset applies to contracts: before you run extraction, you need a notion of *structure*—sections, headings, references (e.g. "as defined in Section 7"). That structure is your graph: nodes are sections or topics, edges are "contains" or "references". Once you have it (or approximate it with heuristics or a cheap first-pass model), you can chunk along section boundaries instead of arbitrary page breaks. So: *document structure as a knowledge graph* drives *semantic chunking*.

### 2. Semantic Chunking Beats Page-Based Splits
I tried feeding more of the document in one go (larger context, chunking by page count). Middle sections were still under-weighted. The lesson: split by semantic sections (e.g. "Indemnification", "Fees", "Termination") so that each chunk is a coherent unit and the model isn't guessing where one idea ends and another begins. When you have a section/topic map (from the graph view above), chunking becomes deterministic: one chunk per section or per logical block, with provenance so the Judge knows where each candidate came from.

### 3. Candidates Plus an LLM Judge Cut Hallucinations (Multi-LLM Calls)
Keeping multiple candidates per field (one or more per chunk) and deferring the final choice was a big win. I added a second step—an LLM acting as a Judge—that takes the candidates and their surrounding text and selects or synthesizes the best answer with an explicit confidence score. Giving the Judge context around each candidate (not just the raw string) cut down hallucinations in my tests. So you get *multi-LLM calls* in a single job: one or more extraction calls per chunk, then a Judge call per field. The pipeline is deterministic (same chunks, same routing); the LLMs are the probability functions inside it.

### 4. Split Extraction and Validation—Validation Loops with a Cap
In production we had merged validation into the extraction prompt to save an API call. In experiments I split them: extraction first, then a validator that could reject and return structured feedback. The validator becomes a feedback signal for a *validation loop*: retry extraction or Judge with the feedback, then validate again. The critical constraint: max retries. After N attempts we stop and send to human review—no unbounded loops. So the pipeline is: chunk → extract (per chunk) → aggregate (Judge per field) → validate → if fail and retries left, retry with feedback; else escalate.

### 5. The Architecture I'm Betting On
**Graph-informed chunking + multi-LLM + validation loop.** Use document structure (section/topic graph, or a good heuristic) to define chunks. Run extraction per chunk and collect candidates per field with provenance. Run an LLM Judge per field (candidates + context) to pick the best answer and a confidence score. Run a validation step that can reject and return structured feedback; on reject, retry (extraction or Judge) with that feedback, up to a hard cap, then send to human review. That's the full picture: knowledge-graph-style structure for chunking, semantic chunking for coverage, multi-LLM calls (extract + Judge) for consistency, and a deterministic validation loop so production stays safe.

## Results

We didn't rip out the current system. It's still multimodal by default (Gemini Vision) because text-only models failed on scanned signature pages, and we kept hybrid extraction because it handles mixed PDFs better than a single mode. The refactor I'm describing is about how we run extraction and validation, not about replacing the existing pipeline. One non-negotiable for production: in high-stakes contract extraction, a false positive (confident wrong answer) is unacceptable. Evals must stress-test for hallucinations. Accuracy of what we output matters more than extracting every field.

One-shot extraction over a giant context is the wrong default for long contracts. Treating the document as a knowledge graph (sections, topics, references) gives you semantic chunking; semantic chunking plus multi-LLM calls (extract per chunk, Judge per field) and a capped validation loop gave me the biggest gain in experiments. I'd make sure evals treat confident wrong as the failure mode you optimize against—and I'd keep the pipeline deterministic so the only probability is inside the model calls.
