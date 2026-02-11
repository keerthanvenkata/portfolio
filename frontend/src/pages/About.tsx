import { useState, useEffect } from 'react'
import Timeline from '../components/Timeline'
import GitHubContributions from '../components/GitHubContributions'
import { fetchTechStack, type TechStackData } from '../lib/api'

export default function AboutPage() {
  const [techStack, setTechStack] = useState<TechStackData | null>(null)

  useEffect(() => {
    fetchTechStack()
      .then(setTechStack)
      .catch(() => setTechStack(null))
  }, [])

  const sectionTitle = techStack?.sectionTitle ?? 'Technology and Tools'
  const items = techStack?.items ?? []

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold gradient-text-purple mb-4">About Me</h1>
        <p className="text-gray-300 mt-2 text-lg">Career trajectory, education, and highlights.</p>
      </div>

      <Timeline />

      <div className="mt-10">
        <GitHubContributions />
      </div>

      <section className="mt-12 pt-12 border-t border-violet/30">
        <h2 className="text-2xl font-heading font-bold gradient-text-purple mb-6">{sectionTitle}</h2>
        <p className="text-gray-400 mb-6">Languages, frameworks, and platforms I use or have experience with.</p>
        <div className="flex flex-wrap gap-2 items-center">
          {items.map(({ name, logo, url }) => {
            const icon = logo ? (
              <img src={logo} alt={name} className="h-7 w-7 object-contain" />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded bg-violet/20 text-violet text-xs font-semibold">
                {name.slice(0, 1)}
              </span>
            )
            return url ? (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-violet/20 hover:border-violet/50 hover:bg-white/10 transition-colors"
                title={name}
              >
                {icon}
              </a>
            ) : (
              <div key={name} className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-violet/20" title={name}>
                {icon}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
