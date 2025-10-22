from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from ..models import Project
from ..services.content_loader import load_projects, load_project_by_id


router = APIRouter()


@router.get("/", response_model=List[Project])
async def list_projects(
    featured: Optional[bool] = Query(default=None),
    kind: Optional[str] = Query(default=None, description="project | experimental | all"),
):
    return load_projects(featured=featured, kind=kind)


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = load_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


