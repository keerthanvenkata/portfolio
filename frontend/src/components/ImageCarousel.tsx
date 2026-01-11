import type React from 'react'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageCarouselProps {
  images: string[]
  altPrefix?: string
  className?: string
  renderOverlay?: (index: number) => React.ReactNode
  onMainClick?: (index: number) => void
}

export default function ImageCarousel({ images, altPrefix = 'Image', className = '', renderOverlay, onMainClick }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  // Close fullscreen on Escape key
  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isFullscreen])

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Image Display */}
        <div className="relative bg-gray-700 rounded-lg overflow-hidden">
          <img
            src={`/media/${images[currentIndex]}`}
            alt={`${altPrefix} ${currentIndex + 1}`}
            className="w-full h-64 md:h-80 object-cover cursor-pointer"
            onClick={() => {
              if (onMainClick) {
                onMainClick(currentIndex)
              } else {
                openFullscreen()
              }
            }}
            loading="lazy"
            decoding="async"
          />

          {/* Custom overlay renderer */}
          {renderOverlay && (
            <div className="pointer-events-none absolute inset-0">
              {renderOverlay(currentIndex)}
            </div>
          )}
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <Maximize2 size={16} />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex
                    ? 'border-cyan-400'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <img
                  src={`/media/${image}`}
                  alt={`${altPrefix} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
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
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/media/${images[currentIndex]}`}
                alt={`${altPrefix} ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
                decoding="async"
              />
              
              {/* Close Button */}
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Close fullscreen"
              >
                <X size={24} />
              </button>

              {/* Navigation in Fullscreen */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter in Fullscreen */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-lg z-10">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
