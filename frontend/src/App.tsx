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
const ContactPage = lazy(() => import('./components/ContactPage'))
import PDFViewer from './components/PDFViewer'
import VKLogo from './components/VKLogo'

// Route prefetchers
const prefetchProjectDetail = () => import('./pages/ProjectDetail')
const prefetchBlogDetail = () => import('./pages/BlogDetail')
const prefetchExperimentalDetail = () => import('./pages/ExperimentalDetail')
const prefetchAbout = () => import('./pages/About')
const prefetchContact = () => import('./components/ContactPage')

function Sidebar({ current, onNavigate }: { current: string, onNavigate?: () => void }) {
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
    <div className="bg-black/80 backdrop-blur-sm border-r border-violet/30 flex flex-col" role="navigation" aria-label="Main">
      <div className="p-6 border-b border-violet/30 flex justify-center">
        <VKLogo size="lg" />
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const href = item.id === 'home' ? '/' : `/${item.id}`
          const onEnter = () => {
            if (item.id === 'about') prefetchAbout()
            if (item.id === 'contact') prefetchContact()
          }
          return (
            <Link 
              key={item.id} 
              to={href}
              onMouseEnter={onEnter}
              onClick={onNavigate}
              aria-current={current === item.id ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                current === item.id 
                  ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_20px_rgba(127,0,255,0.5)]' 
                  : 'text-gray-300 hover:bg-violet/20 hover:text-violet hover:shadow-[0_0_10px_rgba(127,0,255,0.3)]'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-violet/30">
        <div className="flex justify-center gap-3" aria-label="Social links">
          <a href="https://github.com/keerthanvenkata" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet transition-colors hover:scale-110 transform duration-300" aria-label="GitHub profile"><Github size={20} /></a>
          <a href="https://www.linkedin.com/in/venkata-keerthan/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet transition-colors hover:scale-110 transform duration-300" aria-label="LinkedIn profile"><Linkedin size={20} /></a>
          <a href="mailto:keerthanvenkata@gmail.com" className="text-gray-400 hover:text-electric-pink transition-colors hover:scale-110 transform duration-300" aria-label="Send email"><Mail size={20} /></a>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [experimental, setExperimental] = useState<Project[]>([])
  
  useEffect(() => { 
    fetchFeaturedPosts().then(setPosts).catch(() => setPosts([]))
    fetchProjects('project', true).then(setProjects).catch(() => setProjects([]))
    fetchProjects('experimental', true).then(setExperimental).catch(() => setExperimental([]))
  }, [])

  const stats = [
    { label: 'Projects', value: projects.length, icon: Code, color: 'violet', colorClass: 'text-violet' },
    { label: 'Blog Posts', value: posts.length, icon: BookOpen, color: 'electric-pink', colorClass: 'text-electric-pink' },
    { label: 'Experiments', value: experimental.length, icon: Lightbulb, color: 'magenta', colorClass: 'text-magenta' },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Animated background overlay */}
      <div className="animated-bg"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-8xl font-heading font-bold gradient-text-purple text-glow-purple"
            >
              Venkata Keerthan Nimmala
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl font-heading font-semibold text-violet"
            >
              SDE Applied AI & Entrepreneur
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Building scalable systems, AI solutions, and entrepreneurial ventures.
              <span className="block mt-2 text-electric-pink text-glow-pink">Ready for new challenges and impactful projects.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Link
                to="/projects"
                className="px-8 py-4 bg-gradient-to-r from-violet to-magenta rounded-lg font-heading font-semibold text-white hover:shadow-[0_0_30px_rgba(127,0,255,0.5)] transition-all duration-300 transform hover:scale-105"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-electric-pink rounded-lg font-heading font-semibold text-electric-pink hover:bg-electric-pink hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:border-electric-pink transition-all duration-300 group"
              >
                <Icon size={40} className={`${stat.colorClass} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                <div className={`text-4xl font-heading font-bold ${stat.colorClass} mb-2`}>{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Featured Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Featured Projects */}
          {projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="glass rounded-xl p-6 neon-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold text-violet">Featured Projects</h3>
                 <Link to="/projects" className="text-electric-pink hover:text-magenta transition-colors font-medium">
                   See all →
                 </Link>
               </div>
               <div className="space-y-4">
                 {projects.slice(0, 2).map(pr => (
                   <Link
                     key={pr.id}
                     to={`/projects/${pr.id}`}
                    className="block p-4 rounded-lg bg-black/30 border border-violet/30 hover:border-electric-pink transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-semibold text-white group-hover:text-electric-pink transition-colors">
                        {pr.title}
                      </h4>
                      {pr.status && (
                        <span className="bg-neon-green/20 text-neon-green px-2 py-1 rounded text-xs font-medium">
                          {pr.status}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">{pr.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pr.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-xs px-2 py-1 bg-violet/20 text-violet rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Featured Blog Posts */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="glass rounded-xl p-6 neon-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold text-magenta">Latest Blog Posts</h3>
                 <Link to="/blog" className="text-electric-pink hover:text-magenta transition-colors font-medium">
                   See all →
                 </Link>
               </div>
               <div className="space-y-4">
                 {posts.slice(0, 2).map(p => (
                   <Link
                     key={p.id}
                     to={`/blog/${p.id}`}
                    className="block p-4 rounded-lg bg-black/30 border border-magenta/30 hover:border-electric-pink transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 bg-electric-pink/20 text-electric-pink rounded">
                        {p.category}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-heading font-semibold text-white mb-2 group-hover:text-electric-pink transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
           {[
             { name: 'About', icon: Briefcase, link: '/about', colorClass: 'text-violet', borderClass: 'hover:border-violet' },
             { name: 'Blog', icon: BookOpen, link: '/blog', colorClass: 'text-magenta', borderClass: 'hover:border-magenta' },
             { name: 'Resume', icon: ExternalLink, link: '/resume', colorClass: 'text-electric-pink', borderClass: 'hover:border-electric-pink' },
             { name: 'Contact', icon: Mail, link: '/contact', colorClass: 'text-neon-green', borderClass: 'hover:border-neon-green' },
           ].map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`glass rounded-xl p-6 text-center ${item.borderClass} transition-all duration-300 group transform hover:scale-105`}
              >
                <Icon size={32} className={`${item.colorClass} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <div className={`font-heading font-semibold ${item.colorClass}`}>{item.name}</div>
              </Link>
            )
          })}
        </motion.div>
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
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder={`Search ${kind === 'experimental' ? 'experimental projects' : 'projects'}...`}
          onChange={(e) => {
            const q = e.target.value.toLowerCase()
            setLoading(true)
            fetchProjects(kind)
              .then(list => list.filter(p => (
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                (p.tech || []).join(' ').toLowerCase().includes(q)
              )))
              .then(setItems)
              .catch(() => setItems([]))
              .finally(() => setLoading(false))
          }}
          className="flex-1 bg-black/40 border border-violet/30 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-electric-pink focus:shadow-[0_0_10px_rgba(255,0,128,0.3)] transition-all"
        />
      </div>
      <div className="grid gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass rounded-xl p-6 neon-border">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-violet/20 rounded w-1/3" />
                <div className="h-4 bg-violet/20 rounded w-2/3" />
                <div className="h-4 bg-violet/20 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : (
          items.map(pr => (
            <div key={pr.id} className="glass rounded-xl p-6 neon-border hover:shadow-[0_0_30px_rgba(255,0,128,0.4)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white">{pr.title}</h3>
                  {pr.role && <p className="text-violet mt-1">{pr.role}</p>}
                </div>
                {pr.status && <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm border border-neon-green/30">{pr.status}</span>}
              </div>
              <p className="text-gray-300 mb-4">{pr.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {pr.tech.slice(0, 6).map(t => <span key={t} className="bg-violet/20 text-violet px-3 py-1 rounded-full text-sm">{t}</span>)}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleProjectClick(pr.id)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
                >
                  Quick Preview
                </button>
                <Link 
                  to={`/${kind}/${pr.id}`} 
                  onMouseEnter={() => (kind === 'experimental' ? prefetchExperimentalDetail() : prefetchProjectDetail())}
                  className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta border border-electric-pink hover:border-magenta px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transform hover:scale-105"
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
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search posts..."
            onChange={(e) => {
              const q = e.target.value.toLowerCase()
              setLoading(true)
              fetchPosts(category === 'all' ? undefined : category)
                .then(list => list.filter(p => (
                  p.title.toLowerCase().includes(q) ||
                  p.excerpt.toLowerCase().includes(q)
                )))
                .then(setPosts)
                .catch(() => setPosts([]))
                .finally(() => setLoading(false))
            }}
            className="w-full bg-black/40 border border-violet/30 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-electric-pink focus:shadow-[0_0_10px_rgba(255,0,128,0.3)] transition-all"
          />
        </div>
        {cats.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg transition-all duration-300 ${category === cat ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_15px_rgba(127,0,255,0.4)]' : 'bg-black/40 text-gray-300 hover:bg-violet/20 hover:text-violet border border-violet/30'}`}>{cat}</button>
        ))}
      </div>
      <div className="space-y-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass p-6 rounded-xl neon-border">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-violet/20 rounded w-24" />
                <div className="h-5 bg-violet/20 rounded w-2/3" />
                <div className="h-4 bg-violet/20 rounded w-full" />
              </div>
            </div>
          ))
        ) : (
          posts.map(p => (
            <div key={p.id} className="glass p-6 rounded-xl neon-border hover:shadow-[0_0_30px_rgba(255,0,128,0.4)] transition-all">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm bg-electric-pink/20 text-electric-pink border border-electric-pink/30`}>{p.category}</span>
                <span className="text-gray-500 text-sm">{new Date(p.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">{p.title}</h3>
              <p className="text-gray-400 mb-4">{p.excerpt}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handlePostClick(p.id)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
                >
                  Quick Preview
                </button>
                <Link 
                  to={`/blog/${p.id}`} 
                  onMouseEnter={() => prefetchBlogDetail()}
                  className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta border border-electric-pink hover:border-magenta px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transform hover:scale-105"
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
      <div className="glass rounded-xl p-6 neon-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-white">Resume</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/resume/resume-latest.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
            >
              <ExternalLink size={16} />
              View PDF
            </a>
            <a 
              href="/resume/resume-latest.pdf" 
              download 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,0,255,0.5)] transform hover:scale-105"
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
              <a href="/resume/resume-latest.pdf" target="_blank" rel="noopener noreferrer" className="text-electric-pink hover:text-magenta ml-1 underline">
                Open in new tab
              </a>
            </p>
            <p>•</p>
            <a href="/resume/resume-latest.pdf" download className="text-electric-pink hover:text-magenta underline">
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
              className="inline-flex items-center gap-2 text-electric-pink hover:text-magenta transition-colors text-sm"
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
        <div className="bg-black/80 backdrop-blur-sm border-b border-violet/30 sticky top-0 z-30 px-6 py-4">
          <h1 className="text-2xl font-heading font-bold gradient-text-purple">{title}</h1>
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

  // Idle prefetch of likely-next routes (About, Contact, Detail routes)
  useEffect(() => {
    const ric = (cb: () => void) => (
      (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb) : setTimeout(cb, 1200)
    )
    ric(() => {
      prefetchAbout()
      prefetchContact()
      prefetchProjectDetail()
      prefetchBlogDetail()
      prefetchExperimentalDetail()
    })
  }, [])

  const title = {
    home: 'Home', about: 'About Me', projects: 'Featured Projects', experimental: 'Experimental & Hobby Projects', blog: 'Blog', resume: 'Resume', outside: 'Outside Code', contact: "Let's Connect"
  }[current] ?? 'Home'

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      <div className="animated-bg"></div>
      <div className="hidden lg:flex w-64 flex-shrink-0"><Sidebar current={current} /></div>
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-violet/30 px-4 py-3 flex justify-between items-center">
          <VKLogo size="md" />
          <button onClick={() => setMobile(!mobile)} aria-label={mobile ? 'Close menu' : 'Open menu'}>{mobile ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      {mobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black">
          <div className="p-4 border-b border-violet/30 flex justify-between items-center">
            <VKLogo size="md" />
            <button onClick={() => setMobile(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <div className="flex flex-col h-[calc(100vh-73px)]"><Sidebar current={current} onNavigate={() => setMobile(false)} /></div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <Header title={title} />
        <main id="main-content" role="main" className="flex-1 overflow-y-auto pt-16 lg:pt-0">
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
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/outside" element={<OutsidePage />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="bg-black/80 backdrop-blur-sm border-t border-violet/30 py-6 px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">© 2025 Venkata Keerthan Nimmala. Built with React & Tailwind.</p>
            <p className="text-gray-500 text-xs mt-1">Ready for new opportunities • Open to collaboration</p>
          </div>
        </footer>
      </div>
    </div>
  )
}


