import React, { useEffect, useState } from 'react'

const AdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {},
  className = '',
  fallbackContent = null
}) => {
  const [adLoaded, setAdLoaded] = useState(false)
  const [adError, setAdError] = useState(false)

  useEffect(() => {
    try {
      // Check if AdSense is available
      if (window.adsbygoogle && window.adsbygoogle.push) {
        // Push ad to AdSense queue
        window.adsbygoogle.push({})
        setAdLoaded(true)
      } else {
        // AdSense not loaded yet, wait a bit
        const timer = setTimeout(() => {
          if (window.adsbygoogle && window.adsbygoogle.push) {
            window.adsbygoogle.push({})
            setAdLoaded(true)
          } else {
            setAdError(true)
          }
        }, 1000)
        
        return () => clearTimeout(timer)
      }
    } catch (error) {
      console.error('AdSense error:', error)
      setAdError(true)
    }
  }, [])

  // Show fallback content if ad fails to load
  if (adError && fallbackContent) {
    return (
      <div className={`ad-container ad-fallback ${className}`} style={style}>
        {fallbackContent}
      </div>
    )
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: adFormat === 'auto' ? '90px' : '250px',
          ...style
        }}
        data-ad-client="ca-pub-7749661318330944"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        data-ad-status={adLoaded ? 'filled' : 'unfilled'}
      />
      
      {/* Loading indicator for development */}
      {!adLoaded && !adError && (
        <div className="ad-loading" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#999',
          fontSize: '12px'
        }}>
          Loading ad...
        </div>
      )}
    </div>
  )
}

// Pre-configured ad components for common placements
export const BannerAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="horizontal"
    className={`banner-ad ${className}`}
    style={{ minHeight: '90px', marginBottom: '20px' }}
  />
)

export const SquareAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="rectangle"
    className={`square-ad ${className}`}
    style={{ minHeight: '250px', marginBottom: '20px' }}
  />
)

export const SidebarAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="vertical"
    className={`sidebar-ad ${className}`}
    style={{ minHeight: '600px', marginBottom: '20px' }}
  />
)

export const InArticleAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="fluid"
    className={`in-article-ad ${className}`}
    style={{ minHeight: '200px', margin: '20px 0' }}
  />
)

export default AdSense
