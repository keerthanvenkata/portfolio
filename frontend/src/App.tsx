import { useState } from 'react'
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Briefcase, BookOpen, Music, Coffee, Lightbulb, Heart, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { fetchFeaturedPosts, fetchPosts, fetchProjects, type BlogPost, type Project } from './lib/api'
import { useEffect, Suspense, lazy } from 'react'
import ProjectModal from './components/ProjectModal'
import BlogModal from './components/BlogModal'
import ExperimentalModal from './components/ExperimentalModal'
import LoadingSpinner from './components/LoadingSpinner'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const ExperimentalDetail = lazy(() => import('./pages/ExperimentalDetail'))
const AboutPage = lazy(() => import('./pages/About'))
import ContactPage from './components/ContactPage'
import PDFViewer from './components/PDFViewer'
import VKLogo from './components/VKLogo'

function Sidebar({ current }: { current: string }) {
  const navigation = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: Briefcase },
    { name: 'Projects', id: 'projects', icon: Code },
    { name: 'Experimental', id: 'experimental', icon: Lightbulb },
    { name: 'Blog', id: 'blog', icon: BookOpen },
    { name: 'Resume', id: 'resume', icon: ExternalLink },
    { name: 'Outside Code', id: 'outside', icon: Heart },
    { name: 'Contact', id: 'contact', icon: Mail },
  ]
  return (
    <div className="bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800 flex justify-center">
        <VKLogo size="lg" />
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link 
              key={item.id} 
              to={item.id === 'home' ? '/' : `/${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${current === item.id ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex justify-center gap-3">
          <a href="https://github.com/keerthanvenkata" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="https://www.linkedin.com/in/venkata-keerthan/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="mailto:keerthanvenkata@gmail.com" className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => { fetchFeaturedPosts().then(setPosts).catch(() => setPosts([])) }, [])
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Venkata Keerthan Nimmala</motion.h1>
          <p className="text-2xl text-gray-300">SDE Applied AI & Entrepreneur</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Building scalable systems, AI solutions, and entrepreneurial ventures.</p>
        </div>
        {posts.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Featured Blog</h3>
              <Link to="#/blog" className="text-cyan-400">See all</Link>
            </div>
            <div className="space-y-4">
              {posts.slice(0, 2).map(p => (
                <div key={p.id} className="border border-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm">{p.category} • {new Date(p.date).toLocaleDateString()}</div>
                  <div className="text-white font-bold">{p.title}</div>
                  <div className="text-gray-400">{p.excerpt}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectsPage({ kind }: { kind: 'project' | 'experimental' }) {
  const [items, setItems] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    fetchProjects(kind)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [kind])

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId)
    setShowModal(true)
  }

  const handleViewDetails = () => {
    if (selectedProject) {
      navigate(`/${kind}/${selectedProject}`)
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/3" />
                <div className="h-4 bg-gray-700 rounded w-2/3" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : (
          items.map(pr => (
            <div key={pr.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{pr.title}</h3>
                  {pr.role && <p className="text-cyan-400 mt-1">{pr.role}</p>}
                </div>
                {pr.status && <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">{pr.status}</span>}
              </div>
              <p className="text-gray-300 mb-4">{pr.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {pr.tech.slice(0, 6).map(t => <span key={t} className="bg-gray-700 text-cyan-400 px-3 py-1 rounded-full text-sm">{t}</span>)}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleProjectClick(pr.id)}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Quick Preview
                </button>
                <Link 
                  to={`/${kind}/${pr.id}`} 
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border border-cyan-400 hover:border-cyan-300 px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
                {pr.link && (
                  <a 
                    href={pr.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 px-4 py-2 rounded-lg transition-colors"
                  >
                    Visit <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        kind === 'experimental' ? (
          <ExperimentalModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            projectId={selectedProject}
            onViewDetails={handleViewDetails}
          />
        ) : (
          <ProjectModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            projectId={selectedProject}
            onViewDetails={handleViewDetails}
          />
        )
      )}
    </div>
  )
}

function BlogPage() {
  const [category, setCategory] = useState<string>('all')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    fetchPosts(category === 'all' ? undefined : category)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [category])
  const cats = ['all', 'Tech', 'Career', 'Entrepreneurship', 'Tutorial']

  const handlePostClick = (postId: string) => {
    setSelectedPost(postId)
    setShowModal(true)
  }

  const handleViewDetails = () => {
    if (selectedPost) {
      navigate(`/blog/${selectedPost}`)
    }
  }
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-3 mb-6">
        {cats.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg transition-colors ${category === cat ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>{cat}</button>
        ))}
      </div>
      <div className="space-y-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-700 rounded w-24" />
                <div className="h-5 bg-gray-700 rounded w-2/3" />
                <div className="h-4 bg-gray-700 rounded w-full" />
              </div>
            </div>
          ))
        ) : (
          posts.map(p => (
            <div key={p.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-400 border border-blue-500/30`}>{p.category}</span>
                <span className="text-gray-500 text-sm">{new Date(p.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-gray-400 mb-4">{p.excerpt}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handlePostClick(p.id)}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Quick Preview
                </button>
                <Link 
                  to={`/blog/${p.id}`} 
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border border-cyan-400 hover:border-cyan-300 px-4 py-2 rounded-lg transition-colors"
                >
                  Read Full Article
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Blog Modal */}
      {selectedPost && (
        <BlogModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          postId={selectedPost}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  )
}

function ResumePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-white">Resume</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/resume/resume-latest.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              View PDF
            </a>
            <a 
              href="/resume/resume-latest.pdf" 
              download 
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              Download PDF
            </a>
          </div>
        </div>
        
        {/* PDF Viewer Section */}
        <div className="mb-4">
          <PDFViewer 
            src="/resume/resume-latest.pdf"
            title="Resume Preview"
            height="800px"
          />
        </div>
        
        <div className="text-sm text-gray-400 space-y-2">
          <p>Last updated: January 28, 2025</p>
          <div className="flex flex-wrap gap-4">
            <p>Having trouble viewing? 
              <a href="/resume/resume-latest.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 ml-1 underline">
                Open in new tab
              </a>
            </p>
            <p>•</p>
            <a href="/resume/resume-latest.pdf" download className="text-cyan-400 hover:text-cyan-300 underline">
              Download directly
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function OutsidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4"><Music size={28} className="text-purple-400" /><h3 className="text-2xl font-bold text-white">Music</h3></div>
        <p className="text-gray-300 mb-4">Playlists that fuel my focus and coding sessions.</p>
        <div className="space-y-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe 
              style={{ borderRadius: 12 }} 
              src="https://open.spotify.com/embed/playlist/7p4UDA3iRUHzOOVB29ySL1?utm_source=generator&theme=0" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="Rock Gear Playlist"
            ></iframe>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Rock Gear - My Coding Playlist</p>
            <a 
              href="https://open.spotify.com/playlist/7p4UDA3iRUHzOOVB29ySL1?si=7fc6104f871c477b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              <ExternalLink size={16} />
              Open in Spotify
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-8 rounded-xl border border-orange-500/30">
        <div className="flex items-center gap-3 mb-4"><Coffee size={28} className="text-orange-400" /><h3 className="text-2xl font-bold text-white">Food</h3></div>
        <p className="text-gray-300">Hyderabad biryani enthusiast.</p>
      </div>
    </div>
  )
}

function Header({ title }: { title: string }) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-30 px-6 py-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </div>
  )
}

export default function App() {
  const [current, setCurrent] = useState('home')
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  
  // Update current page based on route
  useEffect(() => {
    const path = location.pathname
    if (path === '/projects' || path.startsWith('/projects/')) {
      setCurrent('projects')
    } else if (path === '/blog' || path.startsWith('/blog/')) {
      setCurrent('blog')
    } else if (path === '/experimental' || path.startsWith('/experimental/')) {
      setCurrent('experimental')
    } else if (path === '/resume') {
      setCurrent('resume')
    } else if (path === '/about') {
      setCurrent('about')
    } else if (path === '/contact') {
      setCurrent('contact')
    } else if (path === '/outside') {
      setCurrent('outside')
    } else {
      setCurrent('home')
    }
  }, [location.pathname])

  const title = {
    home: 'Home', about: 'About Me', projects: 'Featured Projects', experimental: 'Experimental & Hobby Projects', blog: 'Blog', resume: 'Resume', outside: 'Outside Code', contact: "Let's Connect"
  }[current] ?? 'Home'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white flex">
      <div className="hidden lg:flex w-64 flex-shrink-0"><Sidebar current={current} /></div>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <VKLogo size="md" />
        <button onClick={() => setMobile(!mobile)}>{mobile ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {mobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <VKLogo size="md" />
            <button onClick={() => setMobile(false)}><X size={24} /></button>
          </div>
          <div className="flex flex-col h-[calc(100vh-73px)]"><Sidebar current={current} /></div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage kind="project" />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/experimental" element={<ProjectsPage kind="experimental" />} />
              <Route path="/experimental/:id" element={<ExperimentalDetail />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<div className="max-w-3xl mx-auto px-6 py-12 text-gray-300">Email: <a className="text-cyan-400" href="mailto:keerthanvenkata@gmail.com">keerthanvenkata@gmail.com</a></div>} />
              <Route path="/outside" element={<OutsidePage />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="bg-gray-900 border-t border-gray-800 py-6 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">© 2025 Venkata Keerthan Nimmala. Built with React & Tailwind.</p>
            <p className="text-gray-500 text-xs mt-1">Ready for new opportunities • Open to collaboration</p>
          </div>
        </footer>
      </div>
    </div>
  )
}


