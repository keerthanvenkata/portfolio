import Timeline from '../components/Timeline'
import GitHubContributions from '../components/GitHubContributions'

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
    </div>
  )
}
