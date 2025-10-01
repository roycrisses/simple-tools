import React, { useEffect } from 'react'

const AdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {},
  className = ''
}) => {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (window.adsbygoogle && window.adsbygoogle.push) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-7749661318330944"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
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
