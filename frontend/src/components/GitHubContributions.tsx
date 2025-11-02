import { useEffect, useState, useRef } from 'react'
import { fetchSocial, type SocialConfig } from '../lib/api'

declare global {
  interface Window {
    GitHubCalendar: (container: HTMLElement, username: string, options?: any) => void
  }
}

export default function GitHubContributions() {
  const [social, setSocial] = useState<SocialConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchSocial().then(setSocial).catch(() => setSocial(null))
  }, [])

  useEffect(() => {
    // Load GitHub Calendar script dynamically
    if (!isLoaded && typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js'
      script.onload = () => setIsLoaded(true)
      script.onerror = () => setError('Failed to load GitHub Calendar')
      document.head.appendChild(script)

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css'
      document.head.appendChild(link)

      return () => {
        // Cleanup
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (social?.github_username && calendarRef.current && window.GitHubCalendar && isLoaded) {
      try {
        // Clear previous content
        calendarRef.current.innerHTML = ''
        
        // Initialize GitHub Calendar with custom colors
        window.GitHubCalendar(calendarRef.current, social.github_username, {
          responsive: true,
          tooltips: true,
          global_stats: true,
          cache: 86400,
          summary_text: 'Summary of Pull Requests, Issues opened, and Commits pushed to GitHub',
        })
      } catch (err) {
        console.error('GitHub Calendar error:', err)
        setError('Failed to render calendar')
      }
    }
  }, [social, isLoaded])

  if (!social?.github_username) {
    return (
      <div className="glass rounded-xl p-6 neon-border">
        <div className="text-gray-400 text-sm">GitHub username not configured.</div>
      </div>
    )
  }

  const username = social.github_username

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

      {!error ? (
        <div className="overflow-x-auto rounded-lg bg-black/30 border border-violet/30 p-4">
          <div ref={calendarRef} className="github-calendar-container">
            {!isLoaded && (
              <div className="text-center py-8">
                <div className="animate-pulse text-gray-400">Loading GitHub contributions...</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">
          Unable to load contributions calendar. Visit{' '}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-pink hover:text-magenta transition-colors"
          >
            @{username}
          </a>
          {' '}on GitHub instead.
        </div>
      )}

      <style>{`
        .github-calendar-container .calendar {
          border: none !important;
          border-radius: 8px;
        }
        .github-calendar-container .calendar .day[data-level="1"] {
          fill: rgba(127, 0, 255, 0.3) !important;
        }
        .github-calendar-container .calendar .day[data-level="2"] {
          fill: rgba(127, 0, 255, 0.5) !important;
        }
        .github-calendar-container .calendar .day[data-level="3"] {
          fill: rgba(255, 0, 255, 0.7) !important;
        }
        .github-calendar-container .calendar .day[data-level="4"] {
          fill: rgba(255, 0, 128, 0.9) !important;
        }
        .github-calendar-container .calendar .contrib-column {
          border-color: rgba(127, 0, 255, 0.3) !important;
        }
        .github-calendar-container .calendar text {
          fill: rgba(255, 255, 255, 0.8) !important;
        }
        .github-calendar-container .calendar .contrib-legend {
          color: rgba(255, 255, 255, 0.8) !important;
        }
      `}</style>
    </div>
  )
}
