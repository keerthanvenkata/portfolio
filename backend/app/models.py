from datetime import date
from typing import List, Optional
from pydantic import BaseModel, Field


class BlogPost(BaseModel):
    id: str
    title: str
    excerpt: str
    category: str
    date: date
    featured: bool = False
    content_html: Optional[str] = None


class Project(BaseModel):
    id: str
    title: str
    role: Optional[str] = None
    description: str
    contribution: Optional[str] = None
    tech: List[str] = Field(default_factory=list)
    link: Optional[str] = None
    embedSite: Optional[str] = None
    status: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None
    videoPoster: Optional[str] = None
    highlights: List[str] = Field(default_factory=list)
    featured: bool = False
    kind: str = "project"  # project | experimental


