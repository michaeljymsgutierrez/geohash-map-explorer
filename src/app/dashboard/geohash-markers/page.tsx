'use client'

import dynamic from 'next/dynamic'
import Controller from './controller'

const GeohashMap = dynamic(() => import('@components/geohash-map'), {
  ssr: false,
})

const GeohashMarkersPage = () => {
  const controller = Controller()

  return (
    <div className="geohash-markers-page">
      <GeohashMap geohashes={controller.stringSearchParams} />
    </div>
  )
}

export default GeohashMarkersPage
