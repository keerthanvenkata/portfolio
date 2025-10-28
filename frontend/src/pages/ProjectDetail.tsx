import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Code, User, Star } from 'lucide-react'
import { fetchProject, type Project } from '../lib/api'
import ImageCarousel from '../components/ImageCarousel'
import VideoPlayer from '../components/VideoPlayer'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchProject(id)
        .then(setProject)
        .catch(() => setProject(null))
        .finally(() => setLoading(false))
    }
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

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link 
            to="/#/projects" 
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/#/home" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/#/projects" className="hover:text-white transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-white">{project.title}</span>
      </nav>

      {/* Back Button */}
      <Link 
        to="/#/projects" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-white">{project.title}</h1>
              {project.status && (
                <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  {project.status}
                </span>
              )}
            </div>
            
            {project.role && (
              <div className="flex items-center gap-2 text-cyan-400 mb-4">
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
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                Visit Project
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Code size={24} />
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <span key={tech} className="bg-gray-700 text-cyan-400 px-4 py-2 rounded-lg text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Star size={24} />
            Key Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contribution */}
      {project.contribution && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">My Contribution</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">{project.contribution}</p>
          </div>
        </div>
      )}

      {/* Images/Videos Section */}
      {(project.images.length > 0 || project.video) && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Media</h2>
          
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">More Projects</h2>
        <p className="text-gray-400 mb-4">Explore other projects in my portfolio.</p>
        <Link 
          to="/#/projects" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View All Projects
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  )
}
