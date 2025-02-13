import './styles.scss'
import { FloatButton, Segmented } from 'antd'
import { MonitoringNavButtonsProps } from './types'

const MonitoringNavButtons = ({
  activeNav,
  navOptions,
  onNavOptionClick,
}: MonitoringNavButtonsProps) => {
  return (
    <FloatButton.Group shape="square" className="monitoring-nav-buttons">
      <Segmented
        className="nav-buttons-segment"
        value={activeNav}
        options={navOptions}
        onChange={onNavOptionClick}
      />
    </FloatButton.Group>
  )
}

export default MonitoringNavButtons
