import React from 'react'
import { Link } from 'react-router-dom'

interface VKLogoImageProps {
  className?: string
  size?: number
  src?: string
}

export default function VKLogoImage({ 
  className = '', 
  size = 48, 
  src = '/logo/vk-logo.png' // You can replace this with your image path
}: VKLogoImageProps) {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img
        src={src}
        alt="VK Logo"
        width={size}
        height={size}
        className="rounded-full hover:scale-105 transition-transform duration-200"
        onError={(e) => {
          // Fallback to CSS logo if image fails to load
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition-transform duration-200">
                VK
              </div>
            `
          }
        }}
      />
    </Link>
  )
}
