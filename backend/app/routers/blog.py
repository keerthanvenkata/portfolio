from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from ..models import BlogPost
from ..services.content_loader import load_posts, load_post_by_id


router = APIRouter()


@router.get("/posts", response_model=List[BlogPost])
async def list_posts(
    category: Optional[str] = Query(default=None),
    featured: Optional[bool] = Query(default=None),
):
    return load_posts(category=category, featured=featured)


@router.get("/posts/{post_id}", response_model=BlogPost)
async def get_post(post_id: str):
    post = load_post_by_id(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


