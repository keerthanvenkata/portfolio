import { useState, useEffect } from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Modal from './Modal'
import { fetchPost, type BlogPost } from '../lib/api'

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  onViewDetails: () => void
}

export default function BlogModal({ isOpen, onClose, postId, onViewDetails }: BlogModalProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && postId) {
      setLoading(true)
      fetchPost(postId)
        .then(setPost)
        .catch(() => setPost(null))
        .finally(() => setLoading(false))
    }
  }, [isOpen, postId])

  const handleViewDetails = () => {
    onClose()
    onViewDetails()
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post?.content_html?.split(/\s+/).length || 0
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={post?.title} size="md">
      {loading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ) : post ? (
        <div className="p-6 space-y-6">
          {/* Post Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
            <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs border border-blue-500/30">
              {post.category}
            </span>
          </div>

          {/* Excerpt */}
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-lg">
              {post.excerpt}
            </p>
          </div>

          {/* Content Preview */}
          {post.content_html && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Preview</h3>
              <div 
                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-cyan-400 prose-strong:text-white prose-code:text-cyan-300 prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: post.content_html.substring(0, 500) + (post.content_html.length > 500 ? '...' : '')
                }}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Read Full Article
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-400">Post not found</p>
        </div>
      )}
    </Modal>
  )
}
