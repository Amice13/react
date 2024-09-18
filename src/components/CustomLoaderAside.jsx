import React from 'react'
import ContentLoader from 'react-content-loader'

const CustomLoaderAside = props => {
  return (
    <ContentLoader
      viewBox="0 0 150 140"
      backgroundColor="rgba(0,0,0,0.12)"
      foregroundColor="rgba(0,0,0,0.18)"
      {...props}
    >
      <rect x="5" y="0" rx="5" ry="0" width="130" height="30" />
      <rect x="5" y="40" rx="5" ry="5" width="130" height="15" />
      <rect x="5" y="60" rx="5" ry="5" width="130" height="15" />
      <rect x="5" y="80" rx="5" ry="5" width="130" height="15" />
      <rect x="5" y="100" rx="5" ry="5" width="130" height="15" />
      <rect x="5" y="120" rx="5" ry="5" width="130" height="15" />
    </ContentLoader>
  )
}

export default CustomLoaderAside