import { Link } from 'react-router-dom'

interface VKLogoSVGProps {
  className?: string
  size?: number
}

export default function VKLogoSVG({ className = '', size = 48 }: VKLogoSVGProps) {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="hover:scale-105 transition-transform duration-200"
      >
        <defs>
          <linearGradient id="vkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        
        {/* Circle background */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#vkGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        
        {/* VK Text */}
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-2px"
        >
          VK
        </text>
      </svg>
    </Link>
  )
}
