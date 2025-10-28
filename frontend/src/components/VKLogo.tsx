import { Link } from 'react-router-dom'

interface VKLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function VKLogo({ className = '', size = 'md' }: VKLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  }

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white font-bold hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 ${sizeClasses[size]} ${className}`}
    >
      VK
    </Link>
  )
}
