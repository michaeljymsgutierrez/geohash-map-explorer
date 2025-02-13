import './styles.scss'
import Controller from './controller'
import { GeohashMapProps } from './types'

const GeohashMap = ({ geohashes }: GeohashMapProps) => {
  const controller = Controller(geohashes)

  return (
    <div className="geohash-map">
      <div id="map" ref={controller.mapRef}></div>
    </div>
  )
}

export default GeohashMap
