import { ExternalLink, User, BookOpen, Code } from 'lucide-react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import type { Case } from '../lib/api'

interface CaseModalProps {
  isOpen: boolean
  onClose: () => void
  caseData: Case | null
}

export default function CaseModal({ isOpen, onClose, caseData }: CaseModalProps) {
  const title = caseData
    ? caseData.client
      ? `${caseData.company} · ${caseData.client}`
      : caseData.company
    : 'Case'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      {caseData ? (
        <div className="p-6 space-y-6">
          {/* Quote */}
          <blockquote className="text-gray-300 leading-relaxed border-l-4 border-violet pl-4 italic">
            "{caseData.quote}"
          </blockquote>

          {/* Person */}
          <div className="flex items-center gap-2 text-violet">
            <User size={16} />
            <span className="text-sm font-medium">
              {caseData.person.name}
              {caseData.person.role && ` · ${caseData.person.role}`}
              {caseData.person.company && ` at ${caseData.person.company}`}
            </span>
          </div>

          {/* Client attribution */}
          {caseData.client && (
            <p className="text-gray-400 text-sm">
              Work at {caseData.company} for client {caseData.client}.
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-violet/30">
            {caseData.link && (
              <a
                href={caseData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105 font-semibold"
              >
                <ExternalLink size={16} />
                Visit
              </a>
            )}
            {caseData.projectIds && caseData.projectIds.length > 0 && (
              <>
                {caseData.projectIds.map((projectId) => (
                  <Link
                    key={projectId}
                    to={`/projects/${projectId}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta border border-electric-pink hover:border-magenta px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transform hover:scale-105"
                  >
                    <Code size={16} />
                    View project
                  </Link>
                ))}
              </>
            )}
            {caseData.relatedPosts && caseData.relatedPosts.length > 0 && (
              <>
                {caseData.relatedPosts.map((postId) => (
                  <Link
                    key={postId}
                    to={`/blog/${postId}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta border border-electric-pink hover:border-magenta px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transform hover:scale-105"
                  >
                    <BookOpen size={16} />
                    Read more
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-400">Case not found.</p>
        </div>
      )}
    </Modal>
  )
}
