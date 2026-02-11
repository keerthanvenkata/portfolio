import Timeline from '../components/Timeline'
import GitHubContributions from '../components/GitHubContributions'

// Add or replace with your tech logos: place images in public/tech-logos/ and reference as /tech-logos/name.svg
const TECH_STACK: { name: string; logo?: string }[] = [
  { name: 'Python' },
  { name: 'React' },
  { name: 'FastAPI' },
  { name: 'TypeScript' },
  { name: 'PostgreSQL' },
  { name: 'Docker' },
  // Add more: { name: 'Next.js', logo: '/tech-logos/nextjs.svg' },
]

export default function AboutPage() {
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
        <h2 className="text-2xl font-heading font-bold gradient-text-purple mb-6">Technologies & tools</h2>
        <p className="text-gray-400 mb-6">Platforms and tools I use or have experience with.</p>
        <div className="flex flex-wrap gap-6 items-center">
          {TECH_STACK.map(({ name, logo }) => (
            <div
              key={name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-violet/20 hover:border-violet/50 transition-colors"
              title={name}
            >
              {logo ? (
                <img src={logo} alt={name} className="h-8 w-8 object-contain" />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded bg-violet/20 text-violet text-sm font-semibold">
                  {name.slice(0, 1)}
                </span>
              )}
              <span className="text-gray-300 font-medium">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
