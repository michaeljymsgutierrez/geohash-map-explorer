import React from 'react'

export interface NavButtonOption {
  label: string
  value: string
  icon: React.ReactNode
}

export interface MonitoringNavButtonsProps {
  activeNav: string
  onNavOptionClick: (value: string) => void
  navOptions: NavButtonOption[]
}
