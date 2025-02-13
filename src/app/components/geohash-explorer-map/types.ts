import L from 'leaflet'

export interface LRectangle extends L.Rectangle {
  geohash: string
  marker: LMarker
  _leaflet_id: number
}

export interface LMarker extends L.Marker {
  _icon: LIcon
}

export interface LStyle {
  [key: string]: number | string
}

export interface LIcon extends L.Icon {
  style: LStyle
}

export interface LMap extends L.Map {
  geohashGrids: LRectangle[]
  selectedGeohashGridId: number | null
  selectedGeohash: string
}

export interface GeohasLatLng {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}
