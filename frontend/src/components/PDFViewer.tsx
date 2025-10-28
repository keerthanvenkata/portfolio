import React, { useState } from 'react'
import { ExternalLink, Download, AlertCircle } from 'lucide-react'

interface PDFViewerProps {
  src: string
  title: string
  height?: string
}

export default function PDFViewer({ src, title, height = "800px" }: PDFViewerProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Detect Firefox and set error state immediately
  React.useEffect(() => {
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
    if (isFirefox) {
      // Give Firefox a moment to try loading, then show fallback
      const timer = setTimeout(() => {
        if (isLoading) {
          setHasError(true)
          setIsLoading(false)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (hasError) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">PDF Preview Unavailable</h3>
        <p className="text-gray-500 mb-4">
          Your browser's security settings prevent PDF embedding. This is common in Firefox and other browsers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ExternalLink size={16} />
            Open in New Tab
          </a>
          <a
            href={src}
            download
            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          💡 Tip: Click "Open in New Tab" for the best viewing experience
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">{title}</span>
        <a 
          href={src} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
        >
          <ExternalLink size={12} />
          Open in new tab
        </a>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading PDF...</p>
          </div>
        </div>
      )}
      
      <iframe 
        src={`${src}#toolbar=1&navpanes=1&scrollbar=1`}
        width="100%" 
        height={height}
        className="border-0"
        title={title}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  )
}
