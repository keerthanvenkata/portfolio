import axios from 'axios'

// In Vercel/static deploy, data is served as static files under /api
const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? ''
const BUILD_ID = (import.meta as any).env?.VITE_BUILD_ID || ''
const v = BUILD_ID ? `?v=${BUILD_ID}` : ''

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
  relatedProjects?: string[]
  relatedPosts?: string[]
}

export async function fetchFeaturedPosts() {
  const { data } = await api.get<BlogPost[]>(`/api/posts.json${v}`)
  return data.filter(p => p.featured)
}

export async function fetchPosts(category?: string) {
  const { data } = await api.get<BlogPost[]>(`/api/posts.json${v}`)
  if (category && category.toLowerCase() !== 'all') {
    return data.filter(p => p.category === category)
  }
  return data
}

export async function fetchPost(id: string) {
  const { data } = await api.get<BlogPost>(`/api/posts/${id}.json${v}`)
  return data
}

export async function fetchProjects(kind?: 'project' | 'experimental' | 'all', featured?: boolean) {
  const { data } = await api.get<Project[]>(`/api/projects.json${v}`)
  let out = data
  if (kind && kind !== 'all') out = out.filter(p => p.kind === kind)
  if (typeof featured === 'boolean') out = out.filter(p => Boolean(p.featured) === featured)
  return out
}

export async function fetchProject(id: string) {
  const { data } = await api.get<Project>(`/api/projects/${id}.json${v}`)
  return data
}

export type TimelineItem = {
  id: string
  type: 'education' | 'experience'
  title: string
  organization: string
  location?: string
  start: string
  end?: string | null
  highlights: string[]
}

export async function fetchTimeline() {
  const { data } = await api.get<TimelineItem[]>(`/api/timeline.json${v}`)
  // Sort by start date desc, ongoing first
  const toDate = (s?: string | null) => (s ? new Date(s).getTime() : 0)
  return data.sort((a, b) => {
    const aEnd = a.end ? toDate(a.end) : Infinity
    const bEnd = b.end ? toDate(b.end) : Infinity
    if (aEnd !== bEnd) return bEnd - aEnd
    return toDate(b.start) - toDate(a.start)
  })
}

export type SocialConfig = {
  github_username?: string
  linkedin_url?: string
  github_url?: string
  email?: string
  website?: string
}

export async function fetchSocial() {
  const { data } = await api.get<SocialConfig>(`/api/social.json${v}`)
  return data
}

export type ResumeVersion = {
  version: string
  filename: string
  date: string
  description: string
  is_latest: boolean
}

export type ResumeData = {
  current_version: string
  versions: ResumeVersion[]
  metadata: {
    last_updated: string
    total_versions: number
  }
}

export async function fetchResume() {
  const { data } = await api.get<ResumeData>('/resume/resume.json')
  return data
}


