import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Code, Lightbulb, Star } from 'lucide-react'
import { fetchProject, type Project } from '../lib/api'
import ImageCarousel from '../components/ImageCarousel'
import VideoPlayer from '../components/VideoPlayer'

export default function ExperimentalDetail() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
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
      .then(setProject)
      .catch((error) => {
        setError(`Failed to load project: ${error.response?.status === 404 ? 'Project not found' : error.message}`)
        setProject(null)
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
          <h1 className="text-2xl font-bold text-white mb-4">Experimental Project Not Found</h1>
          <p className="text-gray-400 mb-4">The experimental project you're looking for doesn't exist.</p>
          {error && (
            <p className="text-red-400 mb-4 text-sm">Error: {error}</p>
          )}
          <p className="text-gray-500 mb-6 text-sm">Project ID: {id}</p>
          <Link 
            to="/experimental" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
          >
            <ArrowLeft size={16} />
            Back to Experimental
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
        <Link to="/experimental" className="hover:text-electric-pink transition-colors">Experimental</Link>
        <span>/</span>
        <span className="text-white">{project.title}</span>
      </nav>

      {/* Project Header */}
      <div className="glass rounded-xl p-8 neon-border mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-heading font-bold text-white">{project.title}</h1>
              <span className="bg-electric-pink/20 text-electric-pink px-3 py-1 rounded-full text-sm border border-electric-pink/30 flex items-center gap-1">
                <Lightbulb size={14} />
                Experimental
              </span>
            </div>

            <p className="text-xl text-gray-300 mb-6">{project.description}</p>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
              >
                <ExternalLink size={16} />
                View Project
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass rounded-xl p-6 neon-border mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
          <Code size={24} />
          Technologies Used
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
            Key Features
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

      {/* Details */}
      {(project.contribution || (project as any).details) && (
        <div className="glass rounded-xl p-6 neon-border mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Project Details</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">{project.contribution || (project as any).details}</p>
          </div>
        </div>
      )}

      {/* Images/Videos Section */}
      {((project.images && project.images.length > 0) || project.video) && (
        <div className="glass rounded-xl p-6 neon-border mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Media</h2>
          
          {/* Images */}
          {project.images && project.images.length > 0 && (
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
              <VideoPlayer 
                src={project.video}
                poster={project.videoPoster || undefined}
                title={`${project.title} Demo`}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Related Projects */}
      <div className="glass rounded-xl p-6 neon-border">
        <h2 className="text-2xl font-heading font-bold gradient-text-purple mb-4">More Experimental Projects</h2>
        <p className="text-gray-300 mb-4">Explore other experimental projects and side experiments.</p>
        <Link 
          to="/experimental" 
          className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta transition-colors font-medium"
        >
          View All Experimental
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  )
}
