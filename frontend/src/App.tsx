import { useState, useRef } from 'react'
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

function Sidebar({ current, onNavigate, isMobile = false }: { current: string, onNavigate?: () => void, isMobile?: boolean }) {
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
  
  const [isExpanded, setIsExpanded] = useState(isMobile) // Mobile is always expanded
  const [isPinned, setIsPinned] = useState(false)
  const retractTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  // Transition duration in milliseconds - adjust here for smoothness
  const TRANSITION_DURATION = 300
  
  // Delay before retracting when pinned (in milliseconds)
  const PINNED_RETRACT_DELAY = 1500
  
  // Delay before expanding on hover (in milliseconds)
  const HOVER_EXPAND_DELAY = 500

  // Unified hover handler for both hover zone and logo - treated the same
  const handleTriggerMouseEnter = () => {
    if (isMobile) return
    // Clear any pending retract timeout
    if (retractTimeoutRef.current) {
      clearTimeout(retractTimeoutRef.current)
      retractTimeoutRef.current = null
    }
    // Add delay before expanding
    expandTimeoutRef.current = setTimeout(() => {
      setIsExpanded(true)
      expandTimeoutRef.current = null
    }, HOVER_EXPAND_DELAY)
  }
  
  const handleTriggerMouseLeave = () => {
    if (isMobile) return
    // Clear any pending expand timeout
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current)
      expandTimeoutRef.current = null
    }
    // Don't close here - let sidebar mouse leave handle it
  }
  
  // Handler for when mouse enters sidebar OR logo area (keeps sidebar open)
  const handleSidebarAreaMouseEnter = () => {
    if (isMobile) return
    // Clear any pending retract timeout
    if (retractTimeoutRef.current) {
      clearTimeout(retractTimeoutRef.current)
      retractTimeoutRef.current = null
    }
    // Clear any pending expand timeout and expand immediately
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current)
      expandTimeoutRef.current = null
    }
    // Ensure sidebar is expanded
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }
  
  // Handler for when mouse leaves sidebar area (not hover zone or logo)
  const handleSidebarAreaMouseLeave = (e: React.MouseEvent) => {
    if (isMobile) return
    const relatedTarget = e.relatedTarget as HTMLElement
    // Check if mouse is moving to hover zone, logo, or sidebar
    if (relatedTarget && (
      relatedTarget.closest('[data-hover-zone]') || 
      relatedTarget.closest('[data-logo]') ||
      relatedTarget.closest('[data-sidebar]')
    )) {
      // Mouse is moving to hover zone, logo, or sidebar - keep open
      return
    }
    // Mouse is leaving the entire sidebar area
    if (isPinned) {
      // If pinned, wait 1.5 seconds before retracting
      retractTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
        setIsPinned(false) // Unpin after closing
        retractTimeoutRef.current = null
      }, PINNED_RETRACT_DELAY)
    } else {
      // If not pinned, retract immediately
      setIsExpanded(false)
    }
  }


  const handleSidebarClick = (e: React.MouseEvent) => {
    if (isMobile) return // No pin behavior on mobile
    // Only pin if clicking directly on sidebar container, not on links/buttons
    if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
      // Don't pin if clicking on links or buttons
      return
    }
    // Toggle pin state
    setIsPinned(prev => !prev)
    // Ensure sidebar is expanded when clicking
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent sidebar click handler from firing
    e.stopPropagation()
    if (onNavigate) onNavigate()
  }

  // Handle tab visibility change - reset sidebar state when tab becomes inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab became inactive - clear timeouts and reset sidebar state
        if (retractTimeoutRef.current) {
          clearTimeout(retractTimeoutRef.current)
          retractTimeoutRef.current = null
        }
        if (expandTimeoutRef.current) {
          clearTimeout(expandTimeoutRef.current)
          expandTimeoutRef.current = null
        }
        // Reset sidebar state (but keep pinned state if it was pinned)
        if (!isPinned) {
          setIsExpanded(false)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPinned])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (retractTimeoutRef.current) {
        clearTimeout(retractTimeoutRef.current)
      }
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current)
      }
    }
  }, [])

  // Mobile sidebar - always visible, no hover behavior
  if (isMobile) {
    return (
      <div className="bg-profound-blue/90 backdrop-blur-sm flex flex-col h-full w-full overflow-x-hidden" role="navigation" aria-label="Main">
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 min-h-[44px] ${
                  current === item.id 
                    ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_20px_rgba(127,0,255,0.5)]' 
                    : 'text-gray-300 hover:bg-violet/20 hover:text-violet active:bg-violet/30 hover:shadow-[0_0_10px_rgba(127,0,255,0.3)]'
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
            <a href="https://github.com/keerthanvenkata" target="_blank" rel="noopener noreferrer" className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-violet active:bg-violet/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-pink" aria-label="GitHub profile"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/venkata-keerthan/" target="_blank" rel="noopener noreferrer" className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-violet active:bg-violet/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-pink" aria-label="LinkedIn profile"><Linkedin size={24} /></a>
            <a href="mailto:keerthanvenkata@gmail.com" className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-electric-pink active:bg-violet/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-pink" aria-label="Send email"><Mail size={24} /></a>
          </div>
        </div>
      </div>
    )
  }

  // Desktop sidebar - hover-based with collapse/expand
  return (
    <>
      {/* Logo - Single logo, always at same position (24px from top and left), always visible and clickable */}
      {/* Logo area: triggers sidebar expansion AND keeps it open */}
      <div
        data-logo
        className="hidden lg:block fixed z-50"
        style={{ 
          left: '24px', 
          top: '24px',
          transition: 'none',
          transform: 'none'
        }}
        onMouseEnter={() => {
          handleTriggerMouseEnter()
          handleSidebarAreaMouseEnter() // Also keep sidebar open when on logo
        }}
        onMouseLeave={handleTriggerMouseLeave}
      >
        <VKLogo size="lg" />
      </div>
      
      {/* Invisible area around logo to keep sidebar open when mouse is near logo */}
      {/* This area doesn't block pointer events to logo, but tracks mouse for sidebar state */}
      <div
        data-logo-area
        className="hidden lg:block fixed z-49 pointer-events-none"
        style={{ 
          left: '24px', 
          top: '24px',
          width: '64px', // Logo width
          height: '64px', // Logo height
        }}
      />

      {/* Invisible hover zone on extreme left edge - doubled width */}
      {/* Hover zone and logo treated the same - both trigger expansion */}
      <div
        data-hover-zone
        className="hidden lg:block fixed left-0 top-0 w-10 h-screen z-50"
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
      />
      
      {/* Sidebar - expands on hover with increased transparency */}
      {/* Z-index: above header/footer (z-40) but below logo (z-50), so using z-45 */}
      {/* Logo is 24px from top/left, diameter 64px, so top section: 24px + 64px + 24px = 112px */}
      <div
        data-sidebar
        className={`hidden lg:flex fixed left-0 top-0 h-screen bg-profound-blue/70 backdrop-blur-sm border-r border-violet/50 flex-col transition-all ${
          isExpanded ? 'w-64' : 'w-0 overflow-hidden'
        }`}
        style={{ 
          transitionDuration: `${TRANSITION_DURATION}ms`,
          zIndex: 45
        }}
        onMouseEnter={handleSidebarAreaMouseEnter}
        onMouseLeave={handleSidebarAreaMouseLeave}
        onClick={handleSidebarClick}
        role="navigation"
        aria-label="Main"
      >
        {/* Sidebar Header - Logo area with name positioned next to logo */}
        {/* Height: 24px (top) + 64px (logo) + 24px (bottom) = 112px */}
        <div className="relative min-w-[256px]" style={{ minHeight: '112px', paddingTop: '24px' }}>
          {/* Name - positioned right next to logo, vertically centered with logo */}
          {isExpanded && (
            <div 
              className="absolute flex flex-col justify-center"
              style={{ 
                left: '120px', // Right after logo (logo at 24px, width 64px, ends at 88px, so start at 96px) + 24px more
                top: '24px', // Same top as logo
                height: '64px' // Same height as logo for vertical centering
              }}
            >
              <div className="text-lg font-heading font-semibold text-magenta leading-tight">Keerthan</div>
              <div className="text-lg font-heading font-semibold text-magenta leading-tight">Venkata</div>
            </div>
          )}
        </div>
        <div className="border-b border-violet/30 min-w-[256px]"></div>
        <nav className="flex-1 p-4 space-y-1 min-w-[256px]">
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
                onClick={handleLinkClick}
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
        <div className="p-4 border-t border-violet/30 min-w-[256px]">
          <div className="flex justify-center gap-3" aria-label="Social links">
            <a href="https://github.com/keerthanvenkata" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-violet transition-colors hover:scale-110 transform duration-300" aria-label="GitHub profile"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/venkata-keerthan/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-violet transition-colors hover:scale-110 transform duration-300" aria-label="LinkedIn profile"><Linkedin size={20} /></a>
            <a href="mailto:keerthanvenkata@gmail.com" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-electric-pink transition-colors hover:scale-110 transform duration-300" aria-label="Send email"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </>
  )
}

function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  
  // Portrait image configuration - easily change the filename here
  // Available images: 3.jpeg (full body), 5.jpeg (half body), 13.jpeg (thighs)
  // To change: Update the PORTRAIT_IMAGE constant below
  const PORTRAIT_IMAGE = '3.jpeg' // Change this to switch between images
  
  useEffect(() => { 
    fetchFeaturedPosts().then(setPosts).catch(() => setPosts([]))
    fetchProjects('project', true).then(setProjects).catch(() => setProjects([]))
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Animated background overlay */}
      <div className="animated-bg"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10 w-full overflow-x-hidden">
        {/* Hero Section - Two column layout on desktop, centered on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 mb-20">
          {/* Text Column - Left on desktop, centered on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left space-y-6"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold bg-gradient-to-r from-violet via-magenta to-electric-pink bg-clip-text text-transparent text-glow-purple"
            >
              Venkata Keerthan Nimmala
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-4xl font-heading font-semibold text-violet"
            >
              SDE Applied AI & Entrepreneur
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
            >
              Building scalable systems, AI solutions, and entrepreneurial ventures.
              <span className="block mt-2 text-electric-pink text-glow-pink">Ready for new challenges and impactful projects.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8"
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

          {/* Portrait Image Column - Right on desktop, hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-shrink-0 items-center justify-center"
          >
            <div className="relative">
              <img
                src={`/media/portrait/${PORTRAIT_IMAGE}`}
                alt="Venkata Keerthan Nimmala"
                className="w-auto h-[600px] max-w-[400px] object-contain drop-shadow-[0_0_30px_rgba(127,0,255,0.4)] drop-shadow-[0_0_50px_rgba(255,0,128,0.3)]"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(127, 0, 255, 0.5)) drop-shadow(0 0 40px rgba(255, 0, 128, 0.4))'
                }}
              />
            </div>
          </motion.div>
        </div>

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
      const routePrefix = kind === 'project' ? '/projects' : '/experimental'
      navigate(`${routePrefix}/${selectedProject}`)
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
                  to={kind === 'project' ? `/projects/${pr.id}` : `/experimental/${pr.id}`}
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
        <div className="hidden lg:block bg-black/30 backdrop-blur-sm sticky top-0 z-40 px-6 py-4 transition-all duration-300">
          <h1 className="text-2xl font-heading font-bold text-violet text-glow-purple text-right">{title}</h1>
        </div>
  )
}

function NotFoundPage() {
  const location = useLocation()
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
      <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
      <p className="text-gray-500 mb-4 text-sm">Current path: {location.pathname}</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-magenta hover:from-electric-pink hover:to-magenta text-white px-4 py-2 rounded-lg transition-all duration-300">
        Go Home
      </Link>
    </div>
  )
}

export default function App() {
  const [current, setCurrent] = useState('home')
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobile])
  
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

  // Update page title
  useEffect(() => {
    const titles: Record<string, string> = {
      home: "Keerthan's Page",
      about: "About - Keerthan's Page",
      projects: "Projects - Keerthan's Page",
      experimental: "Experimental - Keerthan's Page",
      blog: "Blog - Keerthan's Page",
      resume: "Resume - Keerthan's Page",
      outside: "Outside Code - Keerthan's Page",
      contact: "Contact - Keerthan's Page",
    }
    
    // Handle detail pages
    if (location.pathname.startsWith('/blog/')) {
      document.title = "Blog - Keerthan's Page"
    } else if (location.pathname.startsWith('/projects/')) {
      document.title = "Projects - Keerthan's Page"
    } else if (location.pathname.startsWith('/experimental/')) {
      document.title = "Experimental - Keerthan's Page"
    } else {
      document.title = titles[current] || "Keerthan's Page"
    }
  }, [current, location.pathname])

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
    <div className="min-h-screen bg-black text-white flex relative overflow-x-hidden">
      <div className="animated-bg"></div>
      
      {/* Desktop Sidebar - hover-based */}
      <Sidebar current={current} />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-violet/30 px-4 py-3 flex justify-between items-center">
        <div className="relative z-10">
          <VKLogo size="md" />
        </div>
        <button 
          onClick={() => setMobile(!mobile)} 
          aria-label={mobile ? 'Close menu' : 'Open menu'}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-violet/20 active:bg-violet/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-pink relative z-10"
        >
          {mobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-profound-blue/90 backdrop-blur-sm flex flex-col">
          {/* Menu Header - Just close button, logo is in main header */}
          <div className="p-4 border-b border-violet/30 flex justify-end items-center flex-shrink-0">
            <button 
              onClick={() => setMobile(false)} 
              aria-label="Close menu"
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-violet/20 active:bg-violet/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-pink relative z-10"
            >
              <X size={24} />
            </button>
          </div>
          {/* Sidebar */}
          <div className="flex-1 overflow-hidden">
            <Sidebar current={current} onNavigate={() => setMobile(false)} isMobile={true} />
          </div>
        </div>
      )}
      
      {/* Main Content - full width since sidebar overlays */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 w-full overflow-x-hidden">
        <Header title={title} />
        <main id="main-content" role="main" className="flex-1 overflow-y-auto overflow-x-hidden pt-16 lg:pt-0 w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/projects" element={<ProjectsPage kind="project" />} />
              <Route path="/experimental/:id" element={<ExperimentalDetail />} />
              <Route path="/experimental" element={<ProjectsPage kind="experimental" />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/outside" element={<OutsidePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="bg-black/30 backdrop-blur-sm py-6 px-6 relative z-10 transition-all duration-300">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">© 2025 Venkata Keerthan Nimmala</p>
            <p className="text-gray-500 text-xs mt-1">Ready for new opportunities • Open to collaboration</p>
          </div>
        </footer>
      </div>
    </div>
  )
}


