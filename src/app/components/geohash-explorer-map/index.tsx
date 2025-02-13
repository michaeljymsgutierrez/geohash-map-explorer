import './styles.scss'
import {
  SyncOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { FloatButton } from 'antd'
import GeohashTableLegend from '@components/geohash-explorer-map-table-legend'
import Controller from './controller'

const GeohashExplorerMap = () => {
  const controller = Controller()

  return (
    <div className="geohash-explorer-map">
      <GeohashTableLegend selectedGeohash={controller.currentGeohash} />

      <div id="map" ref={controller.mapRef}></div>

      <FloatButton.Group shape="square" style={{ insetInlineEnd: 20 }}>
        {/**
        <Tooltip
          placement="left"
          color="blue"
          title={`GEOHASH: ${
            controller.currentGeohash ? controller.currentGeohash : 'N/A'
          } | GRID ID: ${
            controller.currentGeohashGridId
              ? controller.currentGeohashGridId
              : 'N/A'
          }`}
          open
        >
          <FloatButton icon={<QuestionCircleOutlined />} />
        </Tooltip>
        */}
        <FloatButton
          icon={<PlusCircleOutlined />}
          onClick={() => controller.mapZoom('in')}
        />
        <FloatButton
          icon={<MinusCircleOutlined />}
          onClick={() => controller.mapZoom('out')}
        />
        <FloatButton
          icon={<SyncOutlined />}
          onClick={() => controller.clearMap()}
        />
      </FloatButton.Group>
    </div>
  )
}

export default GeohashExplorerMap
