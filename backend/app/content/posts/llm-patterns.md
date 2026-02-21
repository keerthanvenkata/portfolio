---
id: llm-patterns
category: Tech
title: LLM Integration Patterns
excerpt: Practical patterns for production LLM systems—fallback chains, cost control, prompt-as-code, and handling hallucinations.
date: 2024-12-20
featured: true
---

Integrating LLMs into production is very different from prototyping in a notebook. After building contract extraction, event flyer extraction, and tax-roll matching systems, I've settled on a few patterns that keep systems reliable and costs predictable.

**The mental model that helps most:** working production systems today treat the LLM as a *probability function* inside a larger *deterministic* pipeline. The pipeline—chunking, routing, validation, retries, human escalation—is deterministic and testable. The LLM is the stochastic part: you constrain its inputs and outputs, you validate and retry, and you never let a single sample become the source of truth without checks. Once you design that way, fallback chains, caching, and prompt-as-code all slot in naturally.

## Production Patterns That Actually Help

### 1. Fallback Chains

Don't depend on a single model or provider. In our contract extractor we use Gemini as primary; if a call fails (rate limit, timeout, or bad response), we fall back to a lighter model or a cached result. The key is defining what "failure" means: we treat low confidence scores and validation failures as signals to retry or escalate, not just HTTP errors. Chain order matters: put the model that's best for your task first, and the one that's cheapest or fastest as the last resort so you only pay for fallbacks when you need them.

### 2. Cost Management: Caching and Batching

LLM calls are the main cost driver. We cache extraction results by a content hash (e.g. first page + structure hash) so identical or near-identical documents don't hit the API again. For batch jobs we group requests and use async calls with a concurrency limit so we don't burst rate limits. We also use smaller or "flash" models for simple fields and reserve the heavy model for complex sections—this cut our per-document cost significantly without hurting accuracy on the parts that matter.

### 3. Prompt Engineering as Code

Prompts live in versioned files or config, not inside application code. We use templates with placeholders (document chunk, field name, examples) and inject context at runtime. That makes it easy to A/B test prompt changes, roll back, and keep prompts consistent across environments. For validation we use structured output (JSON schema or Pydantic) so we can parse and validate in code instead of parsing free-form text.

## Error Handling and Reliability

Production LLM systems fail in specific ways: hallucinations (confident wrong answers), inconsistent formatting, rate limits, and timeouts. We handle them explicitly.

- **Hallucinations**: Validate against known rules or templates; when confidence is low or validation fails, send to human review instead of auto-publishing. In contract extraction we never treat a single model response as final for high-stakes fields without a Judge or validation step.
- **Rate limits and timeouts**: Exponential backoff, per-provider limits, and a hard cap on retries so we don't spin forever. After N failures we fail the job and alert.
- **Monitoring**: Log token usage, latency, and validation pass/fail rates. Track cost per document or per job so you can see when a new prompt or model changes the bill.

## Summary

Treat the LLM as a probability function inside a deterministic pipeline: the pipeline is the system; the model is one step. Use fallback chains for availability, cache and batch for cost, and keep prompts in code/config. Design for hallucinations and rate limits from day one, and make validation and human review first-class so production stays safe and predictable.
