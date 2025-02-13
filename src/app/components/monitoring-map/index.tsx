'use client'

import './styles.scss'
import { MonitoringMapProps } from './types'
import Controller from './controller'

const MonitoringMap = ({ shops }: MonitoringMapProps) => {
  const controller = Controller(shops)

  return (
    <div className="monitoring-map">
      <div id="map" ref={controller.mapRef}></div>
    </div>
  )
}

export default MonitoringMap
