import Timeline from '../components/Timeline'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">About Me</h1>
        <p className="text-gray-400 mt-2">Career trajectory, education, and highlights.</p>
      </div>

      <Timeline />
    </div>
  )
}
