import './styles.scss'
import { Avatar, List } from 'antd'
import Controller from './controller'
import { MonitoringSidePanelDispatcDispatchProps } from './types'

const MonitoringSidePanelDispatch = ({
  shops,
}: MonitoringSidePanelDispatcDispatchProps) => {
  const controller = Controller(shops)

  return (
    <List
      className="monitoring-side-panel-dispatch-list"
      itemLayout="horizontal"
      dataSource={controller.jobOrders}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={
              <Avatar src="/assets/metromart-job-order-rounded-logo.png" />
            }
            title={<a href="https://ant.design">{item.fullName}</a>}
          />
        </List.Item>
      )}
    />
  )
}

export default MonitoringSidePanelDispatch
