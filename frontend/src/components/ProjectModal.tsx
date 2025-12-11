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
              <div className="flex items-center gap-2 text-violet">
                <User size={16} />
                <span className="text-sm font-medium">{project.role}</span>
              </div>
            )}
            
            <p className="text-gray-300 leading-relaxed">{project.description}</p>

            {project.status && (
              <div className="flex items-center gap-2">
                <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm border border-neon-green/30">
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
                Key Highlights
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
                    +{project.highlights.length - 3} more highlights
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Preview Carousel with optional video poster as first slide */}
          {(project.videoPoster || project.images.length > 0) && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
              {(() => {
                const gallery = [
                  ...(project.video && (project.videoPoster || project.images[0]) ? [project.videoPoster || project.images[0]] : []),
                  ...project.images.filter(img => img !== (project.videoPoster || project.images[0])),
                ]
                return (
                  <div className="relative">
                    <ImageCarousel
                      images={gallery}
                      altPrefix={`${project.title} preview`}
                      className="w-full"
                      renderOverlay={(index) => {
                        const isVideoSlide = index === 0 && Boolean(project.video)
                        if (!isVideoSlide) return null
                        return (
                          <div className="flex items-center justify-center h-full">
                            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center ring-1 ring-white/30">
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                <path d="M8 5v14l11-7z"></path>
                              </svg>
                            </div>
                          </div>
                        )
                      }}
                      onMainClick={(index) => {
                        // If clicking the video slide, go to details to play the video; else open fullscreen
                        if (index === 0 && project.video) {
                          handleViewDetails()
                        } else {
                          // No-op; ImageCarousel will open fullscreen by default if onMainClick is not provided
                        }
                      }}
                    />
                  </div>
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
