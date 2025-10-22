from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .routers import blog, projects
from .config import settings


def create_app() -> FastAPI:
    app = FastAPI(title="Keerthan Portfolio API", version="0.1.0")

    # CORS for local dev frontend (Vite default port)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(blog.router, prefix="/api/blog", tags=["blog"])
    app.include_router(projects.router, prefix="/api/projects", tags=["projects"])

    # Static files for media (images/videos) if needed
    app.mount("/media", StaticFiles(directory=str(settings.MEDIA_DIR), html=False), name="media")

    @app.get("/health")
    async def health() -> dict:
        return {"status": "ok"}

    return app


app = create_app()


