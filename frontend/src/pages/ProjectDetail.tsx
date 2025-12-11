import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Code, User, Star } from 'lucide-react'
import { fetchProject, fetchProjects, type Project } from '../lib/api'
import ImageCarousel from '../components/ImageCarousel'
import VideoPlayer from '../components/VideoPlayer'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [related, setRelated] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setError('No project ID provided')
      return
    }
    setLoading(true)
    setError(null)
    fetchProject(id)
      .then((p) => {
        setProject(p)
        return p
      })
      .then(async (p) => {
        if (!p) return
        const all = await fetchProjects('all')
        const scored = all
          .filter(x => x.id !== p.id)
          .map(x => ({
            item: x,
            score: (x.tech || []).reduce((acc, t) => acc + (p.tech.includes(t) ? 1 : 0), 0) + (x.kind === p.kind ? 0.5 : 0)
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(s => s.item)
        setRelated(scored)
      })
      .catch((error) => {
        setError(`Failed to load project: ${error.response?.status === 404 ? 'Project not found' : error.message}`)
        setProject(null)
        setRelated([])
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!project && !loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-4">The project you're looking for doesn't exist.</p>
          {error && (
            <p className="text-red-400 mb-4 text-sm">Error: {error}</p>
          )}
          <p className="text-gray-500 mb-6 text-sm">Project ID: {id}</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-electric-pink transition-colors">Home</Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-electric-pink transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-white">{project.title}</span>
      </nav>

      {/* Project Header */}
      <div className="glass rounded-xl p-8 neon-border mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-heading font-bold text-white">{project.title}</h1>
              {project.status && (
                <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm border border-neon-green/30">
                  {project.status}
                </span>
              )}
            </div>
            
            {project.role && (
              <div className="flex items-center gap-2 text-violet mb-4">
                <User size={16} />
                <span>{project.role}</span>
              </div>
            )}

            <p className="text-xl text-gray-300 mb-6">{project.description}</p>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
              >
                <ExternalLink size={16} />
                Visit Project
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass rounded-xl p-6 neon-border mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
          <Code size={24} />
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <span key={tech} className="bg-violet/20 text-violet px-4 py-2 rounded-lg text-sm border border-violet/30">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="glass rounded-xl p-6 neon-border mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
            <Star size={24} />
            Key Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-electric-pink mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contribution */}
      {project.contribution && (
        <div className="glass rounded-xl p-6 neon-border mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">My Contribution</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">{project.contribution}</p>
          </div>
        </div>
      )}

      {/* Images/Videos Section */}
      {(project.images.length > 0 || project.video) && (
        <div className="glass rounded-xl p-6 neon-border mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Media</h2>
          
          {/* Images */}
          {project.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Screenshots</h3>
              <ImageCarousel 
                images={project.images}
                altPrefix={`${project.title} screenshot`}
                className="w-full"
              />
            </div>
          )}

          {/* Video */}
          {project.video && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Demo Video</h3>
              {/* If Loom embed URL, use iframe; otherwise treat as local media */}
              {/^https?:\/\/.+loom\.com\/.+/.test(project.video) ? (
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={project.video}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`${project.title} Demo`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              ) : (
                <VideoPlayer 
                  src={project.video}
                  poster={project.videoPoster || undefined}
                  title={`${project.title} Demo`}
                  className="w-full"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="glass rounded-xl p-6 neon-border">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Related Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map(r => (
              <Link key={r.id} to={r.kind === 'project' ? `/projects/${r.id}` : `/experimental/${r.id}`} className="block glass rounded-lg p-4 border border-violet/30 hover:border-electric-pink transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.3)] group">
                <div className="text-white font-semibold group-hover:text-electric-pink transition-colors">{r.title}</div>
                <div className="text-gray-400 text-sm mt-1 line-clamp-2">{r.description}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {r.tech.slice(0, 4).map(t => (
                    <span key={t} className="bg-violet/20 text-violet px-2 py-0.5 rounded text-xs">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
