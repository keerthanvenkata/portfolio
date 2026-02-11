import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, User } from 'lucide-react'
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

      {/* Article Header */}
      <article className="glass rounded-xl p-8 md:p-12 neon-border mb-8">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="bg-electric-pink/20 text-electric-pink px-4 py-2 rounded-full text-sm font-medium border border-electric-pink/30">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Calendar size={16} className="text-violet" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </span>
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Clock size={16} className="text-violet" />
              {readingTime} min read
            </span>
            {post.author && (
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <User size={16} className="text-violet" />
                {post.author}
              </span>
            )}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light font-body">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none font-body blog-content
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:leading-tight prose-h1:font-bold
            prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight prose-h2:font-bold prose-h2:text-violet prose-h2:pb-3 prose-h2:border-b prose-h2:border-violet/30
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:font-semibold prose-h3:text-violet
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:font-semibold prose-h4:text-gray-200
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-body
            prose-a:text-electric-pink prose-a:no-underline prose-a:font-medium hover:prose-a:text-magenta prose-a:transition-colors
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-violet prose-code:bg-black/40 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-black/40 prose-pre:border prose-pre:border-violet/30 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-violet prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-li:text-gray-300 prose-li:mb-3 prose-li:leading-relaxed prose-li:font-body
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
            prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg
            prose-hr:border-violet/30 prose-hr:my-12"
          dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
        />
        
        <style>{`
          .blog-content {
            font-family: 'Inter', sans-serif !important;
          }
          
          /* Subheadings use body font; main title stays in header with font-heading */
          .blog-content h1,
          .blog-content h2,
          .blog-content h3,
          .blog-content h4,
          .blog-content h5,
          .blog-content h6 {
            font-family: 'Inter', sans-serif !important;
          }
          
          .blog-content p,
          .blog-content li,
          .blog-content blockquote,
          .blog-content td,
          .blog-content th,
          .blog-content div {
            font-family: 'Inter', sans-serif !important;
          }
          
          .blog-content h2 {
            font-size: 1.875rem !important;
            font-weight: 700 !important;
            color: #7F00FF !important;
            margin-top: 3rem !important;
            margin-bottom: 1.5rem !important;
            padding-bottom: 0.75rem !important;
            border-bottom: 2px solid rgba(127, 0, 255, 0.3) !important;
            line-height: 1.25 !important;
            letter-spacing: -0.025em !important;
          }
          
          .blog-content h3 {
            color: #7F00FF !important;
          }
          
          .blog-content h4 {
            color: #E5E7EB !important;
          }
        `}</style>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="glass rounded-xl p-8 neon-border mt-12">
          <h2 className="text-2xl font-heading font-bold gradient-text-purple mb-6">More in {post.category}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map(r => (
              <Link key={r.id} to={`/blog/${r.id}`} className="block glass rounded-lg p-6 border border-violet/30 hover:border-electric-pink transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.3)] group">
                <div className="text-white font-heading font-semibold text-lg mb-2 group-hover:text-electric-pink transition-colors">{r.title}</div>
                <div className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">{r.excerpt}</div>
                <div className="text-gray-500 text-xs mt-4">{new Date(r.date).toLocaleDateString()}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
