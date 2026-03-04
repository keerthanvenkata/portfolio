import { FC } from 'react'

type StudioBadgeProps = {
  className?: string
}

const StudioBadge: FC<StudioBadgeProps> = ({ className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-[#00ffff] text-[#00ffff] bg-[#00ffff]/10 shadow-[0_0_20px_rgba(0,255,255,0.45)] tracking-wide uppercase ${className}`}
    >
      TinKern Labs
    </span>
  )
}

export default StudioBadge

