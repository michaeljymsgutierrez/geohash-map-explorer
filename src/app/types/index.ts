import L from 'leaflet'

export type Coordinate = [number, number]

export interface Profile {
  fullName: string
  coordinates: Coordinate
}

export interface JobOrder extends Profile {
  isSelected: boolean
  assignedRunners: Profile[]
  assignedRunnersToJobOrderShopPolylines: L.Polyline[]
}

export interface Shop {
  shopName: string
  shopMarker: L.Marker | null
  coordinates: Coordinate
  isSelected: boolean
  jobOrders: JobOrder[]
  jobOrdersMarkers: L.Marker[]
  runners: Profile[]
  runnersMarkers: L.Marker[]
  runnersPolylines: L.Polyline[]
}

export interface Product {
  brands: string
  code: string
  image_url: string
  nutriscore_grade: string
  product_name: string
  nutriments: {
    [key: string]: number | string
  }
}

export interface GeohashTableLegend {
  id: number
  geohashLength: number
  label: string
  width: string
  height: string
}
