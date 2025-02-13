'use client'

import dynamic from 'next/dynamic'

const GeohashExplorerMap = dynamic(
  () => import('@components/geohash-explorer-map'),
  {
    ssr: false,
  }
)

const GeohashExplorerPage = () => {
  return (
    <div class-name="geohash-explorer-page">
      <GeohashExplorerMap />
    </div>
  )
}

export default GeohashExplorerPage
