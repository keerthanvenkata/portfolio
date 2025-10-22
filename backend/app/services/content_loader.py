from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional

import frontmatter
from markdown import markdown

from ..config import settings
from ..models import BlogPost, Project
import json


def _parse_date(value: str) -> datetime.date:
    return datetime.strptime(value, "%Y-%m-%d").date()


def load_posts(category: Optional[str] = None, featured: Optional[bool] = None) -> List[BlogPost]:
    posts: List[BlogPost] = []
    for md_file in sorted(settings.POSTS_DIR.glob("*.md")):
        post = frontmatter.load(md_file)
        content_html = markdown(post.content)
        meta = post.metadata
        try:
            posts.append(
                BlogPost(
                    id=str(meta["id"]),
                    title=str(meta["title"]),
                    excerpt=str(meta["excerpt"]),
                    category=str(meta["category"]),
                    date=_parse_date(str(meta["date"])),
                    featured=bool(meta.get("featured", False)),
                    content_html=content_html,
                )
            )
        except Exception as exc:
            # Skip malformed posts rather than failing the API
            continue

    if category and category.lower() != "all":
        posts = [p for p in posts if p.category == category]
    if featured is not None:
        posts = [p for p in posts if p.featured is featured]

    # Sort by date desc
    posts.sort(key=lambda p: p.date, reverse=True)
    return posts


def load_post_by_id(post_id: str) -> Optional[BlogPost]:
    for md_file in settings.POSTS_DIR.glob("*.md"):
        post = frontmatter.load(md_file)
        if str(post.metadata.get("id")) == post_id:
            return BlogPost(
                id=str(post.metadata["id"]),
                title=str(post.metadata["title"]),
                excerpt=str(post.metadata["excerpt"]),
                category=str(post.metadata["category"]),
                date=_parse_date(str(post.metadata["date"])),
                featured=bool(post.metadata.get("featured", False)),
                content_html=markdown(post.content),
            )
    return None


def _read_json_array(path) -> List[dict]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_projects(featured: Optional[bool] = None, kind: Optional[str] = None) -> List[Project]:
    data: List[dict] = []
    if kind in (None, "project", "all"):
        data.extend(_read_json_array(settings.PROJECTS_FILE))
    if kind in (None, "experimental", "all"):
        experimental = _read_json_array(settings.EXPERIMENTAL_FILE)
        for item in experimental:
            item.setdefault("kind", "experimental")
        data.extend(experimental)

    projects: List[Project] = []
    for d in data:
        try:
            projects.append(Project(**d))
        except Exception:
            continue

    if featured is not None:
        projects = [p for p in projects if p.featured is featured]

    return projects


def load_project_by_id(project_id: str) -> Optional[Project]:
    for path in (settings.PROJECTS_FILE, settings.EXPERIMENTAL_FILE):
        for d in _read_json_array(path):
            if str(d.get("id")) == project_id:
                return Project(**d)
    return None


