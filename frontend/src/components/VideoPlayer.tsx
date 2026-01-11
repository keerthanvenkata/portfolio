import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
  autoPlay?: boolean
  controls?: boolean
}

export default function VideoPlayer({ 
  src, 
  poster, 
  title, 
  className = '', 
  autoPlay = false,
  controls = true 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    const video = isFullscreen ? fullscreenVideoRef.current : videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = isFullscreen ? fullscreenVideoRef.current : videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  // Sync video state when fullscreen opens
  useEffect(() => {
    if (isFullscreen && videoRef.current && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = videoRef.current.currentTime
      fullscreenVideoRef.current.muted = videoRef.current.muted
      if (isPlaying) {
        // Small delay to ensure video element is ready
        setTimeout(() => {
          fullscreenVideoRef.current?.play()
        }, 100)
      }
    }
  }, [isFullscreen, isPlaying])

  const closeFullscreen = () => {
    setIsFullscreen(false)
    // Pause video when closing fullscreen
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause()
    }
  }

  const toggleFullscreen = () => {
    if (isFullscreen) {
      closeFullscreen()
    } else {
      openFullscreen()
    }
  }

  // Close fullscreen on Escape key
  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreen()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isFullscreen])

  const restart = () => {
    const video = isFullscreen ? fullscreenVideoRef.current : videoRef.current
    if (video) {
      video.currentTime = 0
      setCurrentTime(0)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={`/media/${src}`}
          poster={poster ? `/media/${poster}` : undefined}
          className="w-full h-auto cursor-pointer"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onClick={openFullscreen}
          autoPlay={autoPlay}
          muted={isMuted}
          title={title}
        />

      {/* Custom Controls Overlay */}
      {controls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Toggle fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                aria-label="Seek video"
                style={{
                  background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-cyan-400 transition-colors"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-cyan-400 transition-colors"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <button
                  onClick={restart}
                  className="text-white hover:text-cyan-400 transition-colors"
                  aria-label="Restart video"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 text-white text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Title */}
      {title && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
          {title}
        </div>
      )}
    </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <div 
              className="relative max-w-7xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={fullscreenVideoRef}
                src={`/media/${src}`}
                poster={poster ? `/media/${poster}` : undefined}
                className="w-full h-auto max-h-[90vh] object-contain"
                onTimeUpdate={() => {
                  if (fullscreenVideoRef.current) {
                    setCurrentTime(fullscreenVideoRef.current.currentTime)
                  }
                }}
                onLoadedMetadata={() => {
                  if (fullscreenVideoRef.current) {
                    setDuration(fullscreenVideoRef.current.duration)
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                autoPlay={autoPlay}
                muted={isMuted}
                title={title}
                controls={false}
              />

              {/* Close Button */}
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Close fullscreen"
              >
                <X size={24} />
              </button>

              {/* Custom Controls Overlay in Fullscreen */}
              {controls && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <button
                      onClick={togglePlay}
                      className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => {
                          if (fullscreenVideoRef.current) {
                            const newTime = parseFloat(e.target.value)
                            fullscreenVideoRef.current.currentTime = newTime
                            setCurrentTime(newTime)
                          }
                        }}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        aria-label="Seek video"
                        style={{
                          background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                        }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-cyan-400 transition-colors"
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-cyan-400 transition-colors"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <button
                          onClick={restart}
                          className="text-white hover:text-cyan-400 transition-colors"
                          aria-label="Restart video"
                        >
                          <RotateCcw size={20} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-white text-sm">
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
