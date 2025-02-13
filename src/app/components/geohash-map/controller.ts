import { useEffect } from 'react'
import Geohash from 'latlon-geohash'
import L from 'leaflet'
import useInitLeafletMap from '@hooks/useInitLeafletMap'

const Controller = (geohashes: string) => {
  const { mapRef, map, bounds } = useInitLeafletMap()

  useEffect(() => {
    if (map && bounds) createGeohashMarkers(geohashes, bounds, map)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, bounds, geohashes])

  function createGeohashMarkers(
    geohashes: string,
    bounds: L.LatLngBounds,
    map: L.Map
  ) {
    const splittedGeohashes = geohashes.split(',')
    const coordinates = splittedGeohashes.map((geohash) => {
      return { geohash, ...Geohash.decode(geohash) }
    })
    // const defaultMapZoom = coordinates.length > 0 ? 50 : 13
    // const defaultMapLatitude = 15.141476045992585
    // const defaultMapLongitude = 121.07963940810525
    const shopIcon = L.icon({
      iconUrl: '/assets/metromart-rounded-logo.png',
      iconSize: [32, 32],
    })

    L.control.zoom({ position: 'topleft' }).addTo(map)

    coordinates.forEach((coordinate) => {
      const { lat, lon, geohash } = coordinate
      const marker = L.marker([coordinate.lat, coordinate.lon], {
        icon: shopIcon,
      }).addTo(map)

      marker
        .bindTooltip(
          `<b>GEOHASH:</b> ${geohash} <br><b>LATITUDE:</b> ${lat} <br><b>LONGITUDE:</b> ${lon} <br>`,
          {
            permanent: true,
            direction: 'top',
            offset: [0, -13],
          }
        )
        .openTooltip()

      bounds.extend(marker.getLatLng())
    })

    if (coordinates.length > 0) {
      map.fitBounds(bounds)

      if (coordinates.length > 1) {
        const centerBound = bounds.getCenter()
        const centerMarker = L.marker([centerBound.lat, centerBound.lng], {
          icon: shopIcon,
        }).addTo(map)

        centerMarker
          .bindTooltip(`<b>Geohashes Center Bound</b>`, {
            permanent: true,
            direction: 'top',
            offset: [0, -13],
          })
          .openTooltip()

        coordinates.forEach((coordinate) => {
          const polyline = L.polyline(
            [
              [centerBound.lat, centerBound.lng],
              [coordinate.lat, coordinate.lon],
            ],
            { color: 'red', weight: 8, opacity: 0.3 }
          )

          const polylineDistanceInKilometer = getPolylineLength(polyline)

          polyline
            .bindTooltip(`<b>${polylineDistanceInKilometer.toFixed(2)} km</b>`)
            .addTo(map)
        })
      }
    }
  }

  /* Function for getting polyline length */
  function getPolylineLength(polyline: L.Polyline): number {
    const startPoint = polyline.getLatLngs()[0] as L.LatLng
    const endPoint = polyline.getLatLngs()[
      polyline.getLatLngs().length - 1
    ] as L.LatLng
    const distance = startPoint.distanceTo(endPoint)
    const distanceInKm = distance / 1000

    return distanceInKm
  }

  return { map, bounds, mapRef }
}

export default Controller
