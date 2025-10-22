import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'

export const api = axios.create({ baseURL: API_BASE })

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  featured?: boolean
  content_html?: string
}

export type Project = {
  id: string
  title: string
  role?: string
  description: string
  contribution?: string
  tech: string[]
  link?: string
  embedSite?: string
  status?: string
  images: string[]
  video?: string | null
  videoPoster?: string | null
  highlights: string[]
  featured?: boolean
  kind: 'project' | 'experimental'
}

export async function fetchFeaturedPosts() {
  const { data } = await api.get<BlogPost[]>('/api/blog/posts', { params: { featured: true } })
  return data
}

export async function fetchPosts(category?: string) {
  const { data } = await api.get<BlogPost[]>('/api/blog/posts', { params: { category } })
  return data
}

export async function fetchPost(id: string) {
  const { data } = await api.get<BlogPost>(`/api/blog/posts/${id}`)
  return data
}

export async function fetchProjects(kind?: 'project' | 'experimental' | 'all', featured?: boolean) {
  const { data } = await api.get<Project[]>('/api/projects', { params: { kind, featured } })
  return data
}

export async function fetchProject(id: string) {
  const { data } = await api.get<Project>(`/api/projects/${id}`)
  return data
}


