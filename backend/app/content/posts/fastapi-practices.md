---
id: fastapi-practices
category: Tutorial
title: FastAPI Best Practices
excerpt: Dependency injection, Pydantic, async I/O, and deployment patterns for production-ready FastAPI apps.
date: 2024-11-15
featured: false
---

FastAPI makes it easy to ship an API quickly, but production readiness comes from a few deliberate choices. Here’s what I use on real projects: dependency injection, Pydantic everywhere, background tasks, and clear error handling.

## Dependency Injection

Use FastAPI’s `Depends()` for everything that can be configured or swapped: DB sessions, config, clients (e.g. LLM or storage). Define a function that returns the dependency and inject it into route handlers. That gives you a single place to control lifecycle (e.g. one session per request) and makes testing trivial—you override the dependency in the test client instead of patching globals.

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/items")
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    ...
```

Keep dependencies thin: they should create or fetch an object, not contain business logic.

## Pydantic for Request and Response

Define Pydantic models for every request body and response. Use `response_model` (or `response_model_exclude_none`) so the API contract is explicit and docs stay accurate. For validation, use custom validators and `Field()` for constraints and descriptions. That way invalid input is rejected at the edge and your handlers work with typed objects, not raw dicts. For large or nested responses, consider `model_config = ConfigDict(from_attributes=True)` and returning ORM models only where you need to avoid N+1; otherwise prefer explicit response models.

## Background Tasks and Async

For work that doesn’t need to block the response (emails, post-processing, enqueueing jobs), use `BackgroundTasks`. Add the task in the route and return immediately; FastAPI runs it after the response is sent. For I/O-bound work (DB, HTTP calls to LLMs or external APIs), use `async` route handlers and async libraries (e.g. `asyncpg`, `httpx`) so a single process can handle many concurrent requests without blocking. Don’t mix blocking calls in async routes—offload those to a thread pool or a worker.

## Exception Handlers

Register custom exception handlers with `@app.exception_handler()`. Map domain exceptions (e.g. `ValidationError`, `NotFound`) to HTTP status codes and a consistent JSON shape (e.g. `{"detail": "...", "code": "..."}`). That way clients get predictable errors and you can log and monitor by exception type. For validation errors from Pydantic, FastAPI’s default 422 is fine; for business rules, use 4xx and reserve 5xx for unexpected failures.

## Testing and Deployment

- **Tests**: Use `TestClient` and override dependencies (e.g. in-memory DB or mock LLM client) so routes are tested in isolation. Test success and failure paths and that response models match what you expect.
- **Deployment**: Run behind a reverse proxy (e.g. Nginx or a cloud load balancer). Use workers (e.g. Gunicorn with uvicorn workers) and set worker count from CPU and I/O characteristics. Pull config from environment variables or a secret manager; never hardcode secrets. Health checks (`/health` or `/ready`) should verify DB and critical dependencies so the orchestrator can restart unhealthy instances.

Adopting these patterns keeps FastAPI apps maintainable, testable, and ready for production traffic.
