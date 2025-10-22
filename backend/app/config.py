from pathlib import Path
from pydantic import BaseModel


class Settings(BaseModel):
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    CONTENT_DIR: Path = BASE_DIR / "content"
    POSTS_DIR: Path = CONTENT_DIR / "posts"
    MEDIA_DIR: Path = CONTENT_DIR / "media"
    PROJECTS_FILE: Path = CONTENT_DIR / "projects.json"
    EXPERIMENTAL_FILE: Path = CONTENT_DIR / "experimental.json"


settings = Settings()


