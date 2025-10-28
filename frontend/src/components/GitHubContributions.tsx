import { useEffect, useState } from 'react'
import { fetchSocial, type SocialConfig } from '../lib/api'

export default function GitHubContributions() {
  const [social, setSocial] = useState<SocialConfig | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSocial().then(setSocial).catch(() => setSocial(null))
  }, [])

  if (!social?.github_username) {
    return (
      <div className="text-gray-400 text-sm">GitHub username not configured.</div>
    )
  }

  const username = social.github_username
  // Color set to brand cyan (22d3ee)
  const chartUrl = `https://ghchart.rshah.org/22d3ee/${encodeURIComponent(username)}`

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">GitHub Contributions</h2>
        {social.github_url && (
          <a
            href={social.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 text-sm"
          >
            View Profile
          </a>
        )}
      </div>

      {!error ? (
        <div className="overflow-x-auto rounded-lg bg-gray-900/40 border border-gray-700 p-4">
          {/* Using an external SVG image for contributions calendar */}
          <img
            src={chartUrl}
            alt={`${username}'s GitHub contributions chart`}
            className="max-w-none"
            onError={() => setError('failed')}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="text-gray-400 text-sm">
          Unable to load contributions chart. Visit{' '}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
          >
            @{username}
          </a>
          {' '}on GitHub instead.
        </div>
      )}
    </div>
  )
}
