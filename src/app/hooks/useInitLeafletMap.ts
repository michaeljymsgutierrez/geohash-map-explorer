import L from 'leaflet'
import { useState, useEffect, useRef } from 'react'

const useInitLeafletMap = () => {
  const [map, setMap] = useState<L.Map | null>(null)
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        const L = await import('leaflet')
        const defaultMapZoom = 17
        const defaultMapLatitude = 14.563410240096365
        const defaultMapLongitude = 121.03664183824773

        if (typeof window !== 'undefined' && mapRef.current) {
          const mapInstance = L.map(mapRef.current, {
            zoomControl: false,
          }).setView([defaultMapLatitude, defaultMapLongitude], defaultMapZoom)

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstance)

          setMap(mapInstance)
          setBounds(L.latLngBounds([]))
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.log(error)
      }
    }

    initMap()

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [map])

  return { map, bounds, mapRef }
}

export default useInitLeafletMap
