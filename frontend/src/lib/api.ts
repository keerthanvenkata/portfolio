import axios from 'axios'

// In Vercel/static deploy, data is served as static files under /api
const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? ''

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
  const { data } = await api.get<BlogPost[]>('/api/posts.json')
  return data.filter(p => p.featured)
}

export async function fetchPosts(category?: string) {
  const { data } = await api.get<BlogPost[]>('/api/posts.json')
  if (category && category.toLowerCase() !== 'all') {
    return data.filter(p => p.category === category)
  }
  return data
}

export async function fetchPost(id: string) {
  const { data } = await api.get<BlogPost>(`/api/posts/${id}.json`)
  return data
}

export async function fetchProjects(kind?: 'project' | 'experimental' | 'all', featured?: boolean) {
  const { data } = await api.get<Project[]>('/api/projects.json')
  let out = data
  if (kind && kind !== 'all') out = out.filter(p => p.kind === kind)
  if (typeof featured === 'boolean') out = out.filter(p => Boolean(p.featured) === featured)
  return out
}

export async function fetchProject(id: string) {
  const { data } = await api.get<Project>(`/api/projects/${id}.json`)
  return data
}


