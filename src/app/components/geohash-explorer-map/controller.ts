import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import L from 'leaflet'
import useInitLeafletMap from '@hooks/useInitLeafletMap'
import { LMap, LRectangle, LMarker, GeohasLatLng } from './types'

const base_32 = '0123456789bcdefghjkmnpqrstuvwxyz'

const Controller = () => {
  const { mapRef, map, bounds } = useInitLeafletMap()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentGeohashGridId, setCurrentGeohashGridId] = useState<
    number | null
  >(null)
  const [currentGeohash, setCurrentGeohash] = useState<string>('')
  const deboucedPlotGeohashStringParams = useDebouncedCallback((map: LMap) => {
    if (searchParams.get('string')) {
      const searchStringParams = searchParams.get('string') || ''
      plotGeohashStringParams(searchStringParams, map)
    }
  }, 100)

  useEffect(() => {
    if (map) initializeGeohashGrids(map as LMap)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  /* Initialize initial set of geohash grids */
  function initializeGeohashGrids(map: LMap): void {
    map.setView([0, 0], 2)
    map.geohashGrids = []
    map.selectedGeohashGridId = null
    map.selectedGeohash = ''

    map.on('zoomend', function () {
      setGeohasGridsResponsiveStyles(map)
    })

    base_32.split('').forEach((char) => generateGeohashGrid(char, char, map))

    deboucedPlotGeohashStringParams(map)
  }

  /* Function for generating geohash grid */
  function generateGeohashGrid(
    geohash: string,
    label: string,
    map: LMap
  ): LRectangle {
    const geohashLatlng = generateGeohashLatLng(geohash)
    const bounds = [
      [geohashLatlng.minLat, geohashLatlng.minLng],
      [geohashLatlng.maxLat, geohashLatlng.maxLng],
    ]
    const rectangle = L.rectangle(bounds as L.LatLngBoundsLiteral).addTo(
      map
    ) as LRectangle
    const center = rectangle.getBounds().getCenter()
    const marker = L.marker(center).addTo(map) as LMarker
    const letterIcon = L.divIcon({
      className: `geohash-grid-${rectangle._leaflet_id}`,
      html: label,
    })

    function onRectangleOrMarkerClick() {
      map.fitBounds(rectangle.getBounds())
      map.selectedGeohashGridId = rectangle._leaflet_id
      map.selectedGeohash = geohash

      setCurrentGeohashGridId(rectangle._leaflet_id)
      setCurrentGeohash(geohash)

      setSelectedGeohashGridStyle(map)
      cleanupNotSelectedGrids(map)
      onGeohashGridClick(geohash, map)
    }

    rectangle.geohash = geohash
    rectangle.marker = marker

    rectangle.on('click', onRectangleOrMarkerClick)
    rectangle.setStyle({
      weight: 0.5,
      fillColor: 'transparent',
      fillOpacity: 0.6,
    })

    marker.setIcon(letterIcon)
    marker.on('click', onRectangleOrMarkerClick)
    marker._icon.style.fontSize = '38px'

    map.geohashGrids.push(rectangle)

    return rectangle
  }

  /* Function for generating geohash latitude and longitude for geohash grid */
  function generateGeohashLatLng(geohash: string): GeohasLatLng {
    /* Credits to Gemini for this code snippet */
    const lat = [-90.0, 90.0]
    const lng = [-180.0, 180.0]
    let even = true

    for (let i = 0; i < geohash.length; i++) {
      const currentChar = geohash[i]
      const currentValue = base_32.indexOf(currentChar)

      for (let mask = 4; mask >= 0; mask--) {
        const bit = (currentValue >> mask) & 1
        if (even) {
          // Longitude processing
          const mid = (lng[0] + lng[1]) / 2
          if (bit === 1) {
            lng[0] = mid
          } else {
            lng[1] = mid
          }
        } else {
          // Latitude processing
          const mid = (lat[0] + lat[1]) / 2
          if (bit === 1) {
            lat[0] = mid
          } else {
            lat[1] = mid
          }
        }
        even = !even
      }
    }

    return { minLat: lat[0], maxLat: lat[1], minLng: lng[0], maxLng: lng[1] }
  }

  /* Function for handling click on generated geohash grid */
  function onGeohashGridClick(geohash: string, map: LMap) {
    base_32
      .split('')
      .forEach((char) => generateGeohashGrid(`${geohash}${char}`, char, map))
    setGeohasGridsResponsiveStyles(map)
    router.push(`/dashboard/geohash-explorer?string=${geohash}`)
  }

  /* Function for hiding not within the selected geohash grid */
  function cleanupNotSelectedGrids(map: LMap) {
    map.geohashGrids.forEach((geohashGrid) => {
      const isSingleCharacterGeohash = Boolean(geohashGrid.geohash.length === 1)
      const selectedGeohashFirstChar = map.selectedGeohash.charAt(0)
      const selectedGeohashLength = map.selectedGeohash.length || 0
      const geohashGridLength = geohashGrid.geohash.length || 0
      const isWithinEqualLengthGeohashGrid =
        Boolean(selectedGeohashLength === geohashGridLength) &&
        Boolean(geohashGrid.geohash.startsWith(selectedGeohashFirstChar))
      const isWithinLongerGeohashGrid =
        Boolean(selectedGeohashLength > geohashGridLength) &&
        Boolean(geohashGrid.geohash.startsWith(selectedGeohashFirstChar))

      if (
        !isSingleCharacterGeohash &&
        !isWithinEqualLengthGeohashGrid &&
        !isSingleCharacterGeohash &&
        !isWithinLongerGeohashGrid
      ) {
        geohashGrid.marker.remove()
        geohashGrid.remove()
      }
    })
  }

  /* Function for calculating grid label font size on zoom in and out*/
  function calculateGeohashGridLabelFontSize(
    width: number,
    height: number
  ): number {
    const scaleFactor = 0.3
    const smallerDimension = Math.min(width, height)
    const fontSize = Math.round(smallerDimension * scaleFactor)
    return fontSize <= 4 ? 0 : fontSize
  }

  /* Function for updating geohash grid styling */
  function setSelectedGeohashGridStyle(map: LMap): void {
    map.geohashGrids.forEach((geohashGrid) => {
      if (geohashGrid._leaflet_id === map.selectedGeohashGridId) {
        geohashGrid.setStyle({
          weight: 3,
          fillColor: 'transparent',
          fillOpacity: 0.6,
        })
      } else {
        geohashGrid.setStyle({
          weight: 0.5,
          fillColor: 'transparent',
          fillOpacity: 0.6,
        })
      }
    })
  }

  /* Function for making grid elements responsive styling */
  function setGeohasGridsResponsiveStyles(map: LMap): void {
    const geohashPrefixes = generateGeohashPrefixes(map.selectedGeohash)

    map.geohashGrids.forEach((geohashGrid) => {
      const bounds = geohashGrid.getBounds()
      const topLeft = map.latLngToLayerPoint(bounds.getNorthWest())
      const bottomRight = map.latLngToLayerPoint(bounds.getSouthEast())
      const width = bottomRight.x - topLeft.x
      const height = bottomRight.y - topLeft.y
      const fontSize = calculateGeohashGridLabelFontSize(width, height)

      if (geohashGrid.marker._icon) {
        geohashGrid.marker._icon.style.fontSize = Math.round(fontSize) + 'px'
        geohashGrid.marker._icon.style.display = geohashPrefixes.includes(
          geohashGrid.geohash
        )
          ? 'none'
          : 'unset'
      }
    })
  }

  /* Function for generating permutations of geohash in sequence */
  function generateGeohashPrefixes(geohash: string = ''): string[] {
    const prefixes = []

    if (geohash)
      for (let i = 1; i <= geohash.length; i++) {
        prefixes.push(geohash.substring(0, i))
      }

    return prefixes
  }

  function plotGeohashStringParams(geohash: string, map: LMap): void {
    const geohashPrefixes = generateGeohashPrefixes(geohash)

    geohashPrefixes.forEach((geohashPrefix, index) => {
      setTimeout(function () {
        const rectangle = generateGeohashGrid(
          geohashPrefix,
          geohashPrefix.slice(-1),
          map
        )

        map.fitBounds(rectangle.getBounds())
        map.selectedGeohashGridId = rectangle._leaflet_id
        map.selectedGeohash = geohashPrefix

        setCurrentGeohashGridId(rectangle._leaflet_id)
        setCurrentGeohash(geohashPrefix)

        setSelectedGeohashGridStyle(map)
        onGeohashGridClick(geohashPrefix, map)
      }, (index + 1) * 300)
    })
  }

  /* Function for custom map zoom in and out */
  function mapZoom(kind: string): void {
    if (!map) return
    if (kind === 'in') map.zoomIn()
    if (kind === 'out') map.zoomOut()
  }

  /* Function for resetting map */
  function clearMap() {
    const currentMap = map as LMap

    router.push('/dashboard/geohash-explorer')

    if (map) {
      currentMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) layer.remove()
        if (layer instanceof L.Rectangle) layer.remove()
      })
      currentMap.geohashGrids = []
      currentMap.selectedGeohashGridId = null
      currentMap.selectedGeohash = ''

      setCurrentGeohashGridId(null)
      setCurrentGeohash('')
      initializeGeohashGrids(currentMap as LMap)
    }
  }

  return {
    map,
    bounds,
    mapRef,
    currentGeohash,
    currentGeohashGridId,
    mapZoom,
    clearMap,
  }
}

export default Controller
