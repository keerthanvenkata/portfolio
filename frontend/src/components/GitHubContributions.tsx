import { useEffect, useState } from 'react'
import { fetchSocial, type SocialConfig } from '../lib/api'

export default function GitHubContributions() {
  const [social, setSocial] = useState<SocialConfig | null>(null)

  useEffect(() => {
    fetchSocial().then(setSocial).catch(() => setSocial(null))
  }, [])

  if (!social?.github_username) {
    return (
      <div className="glass rounded-xl p-6 neon-border">
        <div className="text-gray-400 text-sm">GitHub username not configured.</div>
      </div>
    )
  }

  const username = social.github_username
  const chartUrl = `https://ghchart.rshah.org/${username}`

  return (
    <div className="glass rounded-xl p-6 neon-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold gradient-text-purple">GitHub Contributions</h2>
        {social.github_url && (
          <a
            href={social.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-pink hover:text-magenta text-sm font-medium transition-colors hover:scale-105 transform duration-300"
          >
            View Profile →
          </a>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg bg-black/30 border border-violet/30 p-4">
        <a
          href={social.github_url || `https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity"
        >
          <img
            src={chartUrl}
            alt={`GitHub contributions graph for ${username}`}
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  )
}
