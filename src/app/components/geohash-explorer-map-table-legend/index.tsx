import './styles.scss'
import { FloatButton, Table } from 'antd'
import Controller from './controller'
import { GeohashTableLegendProps } from './types'

const GeohashTableLegend = (props: GeohashTableLegendProps) => {
  const controller = Controller(props)

  return (
    <FloatButton.Group
      shape="square"
      className="geohash-explorer-map-table-legend"
    >
      <Table
        size="small"
        dataSource={controller.tablesource}
        columns={controller.tablecolumns}
        rowKey="id"
        rowClassName={controller.generateRowClassName}
        pagination={false}
        footer={() => (
          <span>
            <b>GEOHASH: </b>
            {props.selectedGeohash ? props.selectedGeohash : 'NONE'}
          </span>
        )}
      />
    </FloatButton.Group>
  )
}

export default GeohashTableLegend
