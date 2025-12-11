import { useState, useEffect } from 'react'
import { ExternalLink, Code, Star, Lightbulb } from 'lucide-react'
import Modal from './Modal'
import { fetchProject, type Project } from '../lib/api'

interface ExperimentalModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  onViewDetails: () => void
}

export default function ExperimentalModal({ isOpen, onClose, projectId, onViewDetails }: ExperimentalModalProps) {
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
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-electric-pink/20 text-electric-pink px-3 py-1 rounded-full text-sm border border-electric-pink/30 flex items-center gap-1">
                <Lightbulb size={14} />
                Experimental
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Code size={18} />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 8).map(tech => (
                <span key={tech} className="bg-violet/20 text-violet px-3 py-1 rounded-full text-sm border border-violet/30">
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
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-electric-pink mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
                {project.highlights.length > 3 && (
                  <li className="text-gray-400 text-sm">
                    +{project.highlights.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Details Preview */}
          {project.contribution && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Project Details</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.contribution.length > 200 
                  ? project.contribution.substring(0, 200) + '...'
                  : project.contribution
                }
              </p>
            </div>
          )}

          {/* Preview: single representative image (video poster preferred) */}
          {(project.videoPoster || project.images.length > 0) && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
              {(() => {
                const representative = project.videoPoster || project.images[0]
                const isVideo = Boolean(project.video)
                if (!representative) return null
                return (
                  <button
                    onClick={handleViewDetails}
                    className="relative bg-gray-900 rounded-lg overflow-hidden group border border-violet/30 hover:border-electric-pink transition-all duration-300 w-full"
                    aria-label="Open project details"
                    title="Open project details"
                  >
                    <img
                      src={`/media/${representative}`}
                      alt={`${project.title} preview`}
                      className="w-full h-64 object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Play overlay if video exists */}
                    {isVideo && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/60 group-hover:bg-black/70 flex items-center justify-center ring-1 ring-white/30">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                            <path d="M8 5v14l11-7z"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })()}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-violet/30">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105 font-semibold"
            >
              View Full Details
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-electric-pink hover:text-magenta border border-electric-pink hover:border-magenta px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transform hover:scale-105"
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
