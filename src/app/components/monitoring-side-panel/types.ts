import React from 'react'
import { Shop } from '@app-types'

export interface ActivePanelOption {
  label: string
  value: string
  icon: React.ReactNode
}

export interface MonitoringSidePanelProps {
  activePanel: ActivePanelOption
  shops: Shop[]
}
