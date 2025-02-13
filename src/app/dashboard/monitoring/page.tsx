'use client'

import './styles.scss'
import dynamic from 'next/dynamic'
import Controller from './controller'
import MonitoringSidePanel from '@components/monitoring-side-panel'
import MonitoringNavButtons from '@components/monitoring-nav-buttons'

const MonitoringMap = dynamic(() => import('@components/monitoring-map'), {
  ssr: false,
})

const GeohashMarkersPage = () => {
  const controller = Controller()

  return (
    <div className="monitoring-page">
      <MonitoringNavButtons
        activeNav={controller.activeNavOptionValue}
        navOptions={controller.navOptions}
        onNavOptionClick={controller.onNavOptionClick}
      />
      <MonitoringSidePanel
        activePanel={controller.activeNavOption}
        shops={controller.shops}
      />
      <MonitoringMap shops={controller.shops} />
    </div>
  )
}

export default GeohashMarkersPage
