import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage,
  structuredData 
}) => {
  const siteName = "Simple Tools"
  const siteUrl = "https://simple-tools.netlify.app"
  const defaultImage = `${siteUrl}/og-image.jpg`
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - 120+ Free Online Utilities`
  const fullDescription = description || "Premium collection of 120+ free online tools including QR generator, image tools, PDF converter, SEO utilities, and more. Lightning-fast, privacy-focused, no registration required."
  const fullKeywords = keywords || "free online tools, QR code generator, image resizer, YouTube downloader, PDF tools, text tools, color tools, unit converter, image compressor, grammar checker, plagiarism checker, SEO tools, backlink checker, domain authority, keyword research, website SEO checker"
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullOgImage = ogImage || defaultImage

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEOHead
