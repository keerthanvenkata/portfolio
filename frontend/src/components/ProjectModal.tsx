import { useState, useEffect } from 'react'
import { ExternalLink, Code, Star, User } from 'lucide-react'
import Modal from './Modal'
import { fetchProject, type Project } from '../lib/api'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  onViewDetails: () => void
}

export default function ProjectModal({ isOpen, onClose, projectId, onViewDetails }: ProjectModalProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && projectId) {
      setLoading(true)
      fetchProject(projectId)
        .then(setProject)
        .catch(() => setProject(null))
        .finally(() => setLoading(false))
    }
  }, [isOpen, projectId])

  const handleViewDetails = () => {
    onClose()
    onViewDetails()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project?.title} size="lg">
      {loading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ) : project ? (
        <div className="p-6 space-y-6">
          {/* Project Info */}
          <div className="space-y-4">
            {project.role && (
              <div className="flex items-center gap-2 text-cyan-400">
                <User size={16} />
                <span className="text-sm">{project.role}</span>
              </div>
            )}
            
            <p className="text-gray-300 leading-relaxed">{project.description}</p>

            {project.status && (
              <div className="flex items-center gap-2">
                <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  {project.status}
                </span>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Code size={18} />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 8).map(tech => (
                <span key={tech} className="bg-gray-700 text-cyan-400 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
              {project.tech.length > 8 && (
                <span className="text-gray-400 text-sm px-3 py-1">
                  +{project.tech.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Star size={18} />
                Key Highlights
              </h3>
              <ul className="space-y-2">
                {project.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
                {project.highlights.length > 3 && (
                  <li className="text-gray-400 text-sm">
                    +{project.highlights.length - 3} more highlights
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Images Preview */}
          {project.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
              <div className="grid grid-cols-2 gap-3">
                {project.images.slice(0, 2).map((image, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                    <img 
                      src={`/media/${image}`} 
                      alt={`${project.title} preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
                {project.images.length > 2 && (
                  <div className="bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    +{project.images.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Full Details
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border border-cyan-400 hover:border-cyan-300 px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                Visit
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-400">Project not found</p>
        </div>
      )}
    </Modal>
  )
}
