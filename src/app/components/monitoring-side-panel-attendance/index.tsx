import { Avatar, List } from 'antd'
import { MonitoringSidePanelAttendanceProps } from './types'

const MonitoringSidePanelAttendance = ({
  shops,
}: MonitoringSidePanelAttendanceProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={shops}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={<Avatar src="/assets/metromart-rounded-logo.png" />}
            title={<a href="https://ant.design">{item.shopName}</a>}
            description={`Runners: ${item.runners.length} - Shoppers: 0`}
          />
        </List.Item>
      )}
    />
  )
}

export default MonitoringSidePanelAttendance
