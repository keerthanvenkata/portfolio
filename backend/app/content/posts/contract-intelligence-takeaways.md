---
id: contract-intelligence-takeaways
category: Tech
title: Contract Intelligence Takeaways
excerpt: Lessons from building the MSA Metadata Extractor—experiments with long-context LLMs, the Middle Ignorance problem, and a chunk-then-aggregate architecture with an LLM Judge.
date: 2026-02-12
featured: true
---

While building the MSA Metadata Extractor—a contract intelligence system that extracts structured metadata from MSAs, NDAs, and service agreements—I ran into a problem that single-context extraction couldn't fix: long contracts. This post is about the experiments I ran, the lessons I took away, and the architecture I'm convinced is the right next step.

## The Challenge

Production today is a hybrid multimodal pipeline: we send PDFs (and sometimes DOCX) through a coordinator that treats text pages as text and image pages as images, then run Gemini Vision for extraction and template-based validation in a single flow. It works well for typical-length agreements and for "Frankenstein" docs (digital text plus scanned signature pages). The moment we pushed that design onto 50+ page contracts, we saw a pattern I started calling "Middle Ignorance": the model would nail the preamble and the signature block but miss or invent things in the middle—e.g. liability caps in Section 14, termination clauses buried in amendments. We'd get high confidence scores on answers that were wrong. That's the failure mode that matters most in contract extraction: confident hallucinations, not "I don't know."

## Key Learnings

### 1. Semantic Chunking Beats Page-Based Splits
I tried feeding more of the document in one go (larger context, chunking by page count). Middle sections were still under-weighted. The lesson: split by semantic sections (e.g. "Indemnification", "Fees", "Termination") so that each chunk is a coherent unit and the model isn't guessing where one idea ends and another begins.

### 2. Candidates Plus an LLM Judge Cut Hallucinations
Keeping multiple candidates per field (one or more per chunk) and deferring the final choice was a big win. I added a second step—an LLM acting as a Judge—that takes the candidates and their surrounding text and selects or synthesizes the best answer with an explicit confidence score. Giving the Judge context around each candidate (not just the raw string) cut down hallucinations in my tests.

### 3. Split Extraction and Validation
In production we had merged validation into the extraction prompt to save an API call. In experiments I split them: extraction first, then a validator that could reject and return structured feedback. The validator becomes a feedback signal for an agent loop. The critical constraint: max retries. After N attempts we stop and send to human review—no unbounded loops.

### 4. The Architecture I'm Betting On
Chunk by section boundaries, run extraction per chunk and collect candidates per field with provenance, then run an LLM Judge per field (candidates + context) to pick the best answer and output a confidence score. Add a validation step that can reject and request a retry with feedback, with a hard cap on retries. That's the semantic chunking + aggregation design: chunk for coverage, aggregate with a Judge for consistency, and use validation as a control loop.

## Results

We didn't rip out the current system. It's still multimodal by default (Gemini Vision) because text-only models failed on scanned signature pages, and we kept hybrid extraction because it handles mixed PDFs better than a single mode. The refactor I'm describing is about how we run extraction and validation, not about replacing the existing pipeline. One non-negotiable for production: in high-stakes contract extraction, a false positive (confident wrong answer) is unacceptable. Evals must stress-test for hallucinations. Accuracy of what we output matters more than extracting every field.

One-shot extraction over a giant context is the wrong default for long contracts. Semantic chunking plus candidate generation and an LLM Judge that sees context gave me the biggest gain in experiments—and I'd make sure evals treat confident wrong as the failure mode you optimize against.
