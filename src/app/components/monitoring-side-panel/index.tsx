import './styles.scss'
import { FloatButton, Card } from 'antd'
import MonitoringSidePanelAttendance from '@components/monitoring-side-panel-attendance'
import MonitoringSidePanelDispatch from '@components/monitoring-side-panel-dispatch'
import { MonitoringSidePanelProps } from './types'

const MonitoringSidePanel = ({
  activePanel,
  shops,
}: MonitoringSidePanelProps) => {
  return (
    <FloatButton.Group shape="square" className="monitoring-side-panel">
      <Card title={activePanel.label} className="side-panel-content">
        {activePanel.value === 'attendance' && (
          <MonitoringSidePanelAttendance shops={shops} />
        )}
        {activePanel.value === 'dispatch' && (
          <MonitoringSidePanelDispatch shops={shops} />
        )}
      </Card>
    </FloatButton.Group>
  )
}

export default MonitoringSidePanel
