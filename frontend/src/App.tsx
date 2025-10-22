import { useState } from 'react'
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Briefcase, BookOpen, Music, Coffee, ChevronRight, Play, Lightbulb, Heart, ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { fetchFeaturedPosts, fetchPosts, fetchProjects, type BlogPost, type Project } from './lib/api'
import { useEffect } from 'react'

function Sidebar({ current, setCurrent }: { current: string, setCurrent: (p: string) => void }) {
  const navigation = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: Briefcase },
    { name: 'Projects', id: 'projects', icon: Code },
    { name: 'Experimental', id: 'experimental', icon: Lightbulb },
    { name: 'Blog', id: 'blog', icon: BookOpen },
    { name: 'Outside Code', id: 'outside', icon: Heart },
    { name: 'Contact', id: 'contact', icon: Mail },
  ]
  return (
    <div className="bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer" onClick={() => setCurrent('home')}>Keerthan.dev</div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button key={item.id} onClick={() => setCurrent(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${current === item.id ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
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
  useEffect(() => { fetchProjects(kind).then(setItems).catch(() => setItems([])) }, [kind])
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-6">
        {items.map(pr => (
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
            {pr.link && <a href={pr.link} target="_blank" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300">Visit <ExternalLink size={16} /></a>}
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogPage() {
  const [category, setCategory] = useState<string>('all')
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => { fetchPosts(category === 'all' ? undefined : category).then(setPosts).catch(() => setPosts([])) }, [category])
  const cats = ['all', 'Tech', 'Career', 'Entrepreneurship', 'Tutorial']
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-3 mb-6">
        {cats.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg transition-colors ${category === cat ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>{cat}</button>
        ))}
      </div>
      <div className="space-y-6">
        {posts.map(p => (
          <div key={p.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-400 border border-blue-500/30`}>{p.category}</span>
              <span className="text-gray-500 text-sm">{new Date(p.date).toLocaleDateString()}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            <p className="text-gray-400">{p.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OutsidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4"><Music size={28} className="text-purple-400" /><h3 className="text-2xl font-bold text-white">Music</h3></div>
        <p className="text-gray-300 mb-4">Playlists that fuel my focus.</p>
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M" width="100%" height="100%" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
  const title = {
    home: 'Home', about: 'About Me', projects: 'Featured Projects', experimental: 'Experimental & Hobby Projects', blog: 'Blog', outside: 'Outside Code', contact: "Let's Connect"
  }[current] ?? 'Home'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white flex">
      <div className="hidden lg:flex w-64 flex-shrink-0"><Sidebar current={current} setCurrent={setCurrent} /></div>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" onClick={() => setCurrent('home')}>Keerthan.dev</div>
        <button onClick={() => setMobile(!mobile)}>{mobile ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {mobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Keerthan.dev</div>
            <button onClick={() => setMobile(false)}><X size={24} /></button>
          </div>
          <div className="flex flex-col h-[calc(100vh-73px)]"><Sidebar current={current} setCurrent={(p) => { setCurrent(p); setMobile(false) }} /></div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          {current === 'home' && <HomePage />}
          {current === 'projects' && <ProjectsPage kind="project" />}
          {current === 'experimental' && <ProjectsPage kind="experimental" />}
          {current === 'blog' && <BlogPage />}
          {current === 'outside' && <OutsidePage />}
          {current === 'about' && <div className="max-w-4xl mx-auto px-6 py-12 text-gray-300">About content coming soon.</div>}
          {current === 'contact' && <div className="max-w-3xl mx-auto px-6 py-12 text-gray-300">Email: <a className="text-cyan-400" href="mailto:keerthanvenkata@gmail.com">keerthanvenkata@gmail.com</a></div>}
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


