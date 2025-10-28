import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { fetchPost, type BlogPost } from '../lib/api'

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPost(id)
        .then(setPost)
        .catch(() => setPost(null))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
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

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link 
            to="/#/blog" 
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.content_html?.split(/\s+/).length || 0
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/#/home" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/#/blog" className="hover:text-white transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-white">{post.title}</span>
      </nav>

      {/* Back Button */}
      <Link 
        to="/#/blog" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      {/* Article Header */}
      <article className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Clock size={14} />
              {readingTime} min read
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-cyan-400 prose-strong:text-white prose-code:text-cyan-300 prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
        />
      </article>

      {/* Related Posts */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">More Articles</h2>
        <p className="text-gray-400 mb-4">Explore other articles in my blog.</p>
        <Link 
          to="/#/blog" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View All Posts
          <ArrowLeft size={16} className="rotate-180" />
        </Link>
      </div>
    </div>
  )
}
