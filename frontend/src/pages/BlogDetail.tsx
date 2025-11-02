import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { fetchPost, fetchPosts, type BlogPost } from '../lib/api'

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchPost(id)
        .then(async (p) => {
          setPost(p)
          const all = await fetchPosts()
          const rel = all
            .filter(x => x.id !== p.id)
            .filter(x => x.category === p.category)
            .slice(0, 3)
          setRelated(rel)
        })
        .catch(() => {
          setPost(null)
          setRelated([])
        })
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
            to="/blog" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
          >
            <ArrowLeft size={16} />
            Blog
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
        <Link to="/" className="hover:text-electric-pink transition-colors">Home</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-electric-pink transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-white">{post.title}</span>
      </nav>

      {/* Back Button */}
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta transition-colors mb-8 font-medium"
      >
        <ArrowLeft size={16} />
        Blog
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
      {related.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">More in {post.category}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map(r => (
              <Link key={r.id} to={`/blog/${r.id}`} className="block border border-gray-700 rounded-lg p-4 hover:border-electric-pink transition-colors">
                <div className="text-white font-semibold">{r.title}</div>
                <div className="text-gray-400 text-sm mt-1 line-clamp-2">{r.excerpt}</div>
                <div className="text-gray-500 text-xs mt-2">{new Date(r.date).toLocaleDateString()}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
