import { useEffect, useState } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { fetchTimeline, type TimelineItem } from '../lib/api'

function ItemIcon({ type }: { type: TimelineItem['type'] }) {
  return type === 'education' ? (
    <GraduationCap size={18} className="text-blue-400" />
  ) : (
    <Briefcase size={18} className="text-cyan-400" />
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
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-600/40 via-gray-700 to-blue-600/40" />

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="relative pl-12">
            {/* Node */}
            <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-gray-900 border border-cyan-500/60 shadow-[0_0_12px_rgba(34,211,238,0.4)]" />

            {/* Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ItemIcon type={item.type} />
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  <span>{formatRange(item.start, item.end)}</span>
                </div>
              </div>

              <div className="mt-1 text-cyan-400 text-sm flex items-center gap-2">
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
                      <span className="text-cyan-400 mt-1">•</span>
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
