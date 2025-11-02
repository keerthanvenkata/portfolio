import { useEffect, useState } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { fetchTimeline, type TimelineItem } from '../lib/api'

function ItemIcon({ type }: { type: TimelineItem['type'] }) {
  return type === 'education' ? (
    <GraduationCap size={18} className="text-violet" />
  ) : (
    <Briefcase size={18} className="text-electric-pink" />
  )
}

function formatRange(start: string, end?: string | null) {
  const s = new Date(start)
  const e = end ? new Date(end) : null
  const sTxt = s.toLocaleString('en-US', { month: 'short', year: 'numeric' })
  const eTxt = e ? e.toLocaleString('en-US', { month: 'short', year: 'numeric' }) : 'Present'
  return `${sTxt} — ${eTxt}`
}

export default function Timeline() {
  const [items, setItems] = useState<TimelineItem[]>([])

  useEffect(() => {
    fetchTimeline().then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet/40 via-magenta/40 to-electric-pink/40" />

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="relative pl-12">
            {/* Node */}
            <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-black border-2 border-violet shadow-[0_0_12px_rgba(127,0,255,0.6)]" />

            {/* Card */}
            <div className="glass rounded-xl neon-border p-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-white font-heading font-semibold">
                  <ItemIcon type={item.type} />
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} className="text-violet" />
                  <span>{formatRange(item.start, item.end)}</span>
                </div>
              </div>

              <div className="mt-1 text-violet text-sm flex items-center gap-2">
                <span className="font-medium">{item.organization}</span>
                {item.location && (
                  <span className="text-gray-400 flex items-center gap-1">
                    <MapPin size={14} /> {item.location}
                  </span>
                )}
              </div>

              {item.highlights?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="text-electric-pink mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
