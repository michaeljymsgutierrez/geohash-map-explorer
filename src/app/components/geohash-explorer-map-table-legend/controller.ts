import { geohashTableLegends } from '@constants'
import { GeohashTableLegendProps } from './types'
import { GeohashTableLegend } from '@app-types'

const Controller = (props: GeohashTableLegendProps) => {
  const tablesource = geohashTableLegends
  const tablecolumns = [
    {
      title: 'LENGTH',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'WIDTH',
      dataIndex: 'width',
      key: 'width',
    },
    {
      title: 'HEIGHT',
      dataIndex: 'height',
      key: 'height',
    },
  ]

  const generateRowClassName = (record: GeohashTableLegend, index: number) =>
    props.selectedGeohash.length === record.geohashLength
      ? `active-row row-${index}`
      : `inactive-row row-${index}`

  return {
    tablesource,
    tablecolumns,
    generateRowClassName,
  }
}

export default Controller
