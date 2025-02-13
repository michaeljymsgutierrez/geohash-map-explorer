'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import useInitLeafletMap from '@hooks/useInitLeafletMap'
import { Shop, JobOrder, Profile } from '@app-types'

const Controller = (shops: Shop[]) => {
  const { mapRef, map, bounds } = useInitLeafletMap()

  useEffect(() => {
    if (map) {
      clearMap(map)
      shops.forEach((shop) => createShopMarker(shop, map))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, shops])

  /* Function for creating shop marker */
  function createShopMarker(shop: Shop, map: L.Map) {
    const shopIcon = L.icon({
      iconUrl: '/assets/metromart-rounded-logo.png',
      iconSize: [32, 32],
    })
    const shopMarker = L.marker(shop.coordinates, { icon: shopIcon }).addTo(map)

    shop.shopMarker = shopMarker

    shopMarker
      .bindTooltip(`${shop.shopName}`, {
        permanent: true,
        direction: 'top',
        offset: [0, -13],
      })
      .openTooltip()

    shopMarker.on('click', function () {
      onClickShopMarker(shop, map)
    })

    if (bounds) bounds.extend(shopMarker.getLatLng())
  }

  /* Function for removing shop marker */
  function removeShopMarker(shop: Shop) {
    if (shop.shopMarker) shop.shopMarker.remove()
  }

  /* Function for handling shop marker click */
  function onClickShopMarker(shop: Shop, map: L.Map) {
    shop.isSelected = !shop.isSelected

    removeAllPolylines()
    removeAllMarkers()

    if (shop.isSelected) {
      createShopMarker(shop, map)
      shop.jobOrders.forEach((jobOrder) =>
        createJobOrderMarker(shop, jobOrder, map)
      )
      shop.runners.forEach((runner) => createRunnerMarker(shop, runner, map))
    } else {
      shops.forEach((shop) => createShopMarker(shop, map))
    }
  }

  /* Function for creating job order marker */
  function createJobOrderMarker(shop: Shop, jobOrder: JobOrder, map: L.Map) {
    const jobOrderIcon = L.icon({
      iconUrl: '/assets/metromart-job-order-rounded-logo.png',
      iconSize: [25, 25],
    })

    const jobOrderMarker = L.marker(jobOrder.coordinates, {
      icon: jobOrderIcon,
    }).addTo(map)

    jobOrderMarker.bindTooltip(`${jobOrder.fullName}`, {
      permanent: true,
      direction: 'top',
      offset: [0, -10],
    })

    jobOrderMarker.on('click', function () {
      onClickJobOrderMarker(shop, jobOrder, map)
    })

    if (bounds) {
      bounds.extend(jobOrderMarker.getLatLng())
    }

    shop.jobOrdersMarkers.push(jobOrderMarker)
  }

  /* Function for removing job order markers */
  function removeShopJobOrdersMarkers(shop: Shop) {
    if (shop.jobOrdersMarkers)
      shop.jobOrdersMarkers.forEach((jobOrderMarker) => jobOrderMarker.remove())
  }

  /* Function for handling job order marker click */
  function onClickJobOrderMarker(shop: Shop, jobOrder: JobOrder, map: L.Map) {
    const polylineStyle = {
      color: '#32CD32',
      weight: 5,
      opacity: 0.5,
    }

    removeAllPolylines()

    jobOrder.isSelected = !jobOrder.isSelected

    if (jobOrder.isSelected) {
      if (jobOrder.assignedRunners.length > 0) {
        jobOrder.assignedRunners.forEach((assignedRunner) => {
          const jobOrderRunnerPolyline = L.polyline(
            [jobOrder.coordinates, assignedRunner.coordinates],
            polylineStyle
          )
          const runnerShopPolyline = L.polyline(
            [assignedRunner.coordinates, shop.coordinates],
            polylineStyle
          )

          jobOrderRunnerPolyline.addTo(map)
          runnerShopPolyline.addTo(map)

          jobOrder.assignedRunnersToJobOrderShopPolylines.push(
            jobOrderRunnerPolyline
          )
          jobOrder.assignedRunnersToJobOrderShopPolylines.push(
            runnerShopPolyline
          )
        })
      } else {
        const jobOrderShopPolyline = L.polyline(
          [jobOrder.coordinates, shop.coordinates],
          polylineStyle
        )

        jobOrderShopPolyline.addTo(map)

        jobOrder.assignedRunnersToJobOrderShopPolylines.push(
          jobOrderShopPolyline
        )
      }
    } else {
      shop.isSelected = false
      onClickShopMarker(shop, map)
    }
  }

  /* Function for creating runner marker */
  function createRunnerMarker(shop: Shop, runner: Profile, map: L.Map) {
    const polylineStyle = {
      color: '#32CD32',
      weight: 5,
      opacity: 0.1,
    }
    const runnerIcon = L.icon({
      iconUrl: '/assets/metromart-rider-rounded-logo.png',
      iconSize: [25, 25],
    })

    const runnerMarker = L.marker(runner.coordinates, {
      icon: runnerIcon,
    }).addTo(map)

    runnerMarker.bindTooltip(`${runner.fullName}`, {
      permanent: true,
      direction: 'top',
      offset: [0, -10],
    })

    if (shop.isSelected) {
      shop.runners.forEach((runner) => {
        const polyline = L.polyline(
          [shop.coordinates, runner.coordinates],
          polylineStyle
        )
        shop.runnersPolylines.push(polyline)
        polyline.addTo(map)
      })
    }

    if (bounds) {
      bounds.extend(runnerMarker.getLatLng())
    }

    shop.runnersMarkers.push(runnerMarker)
  }

  /* Function for removing runner markers */
  function removeShopRunnersMarkers(shop: Shop) {
    shop.runnersMarkers.forEach((runnerMarker) => runnerMarker.remove())
  }

  /* Function for cleaning up polylines */
  function removeAllPolylines() {
    shops.forEach((shop) => {
      shop.runnersPolylines.forEach((polyline) => polyline.remove())
      shop.jobOrders.forEach((jobOrder) => {
        jobOrder.isSelected = false
        jobOrder.assignedRunnersToJobOrderShopPolylines.forEach((polyline) =>
          polyline.remove()
        )
      })
    })
  }

  /* Function for cleaning up markers */
  function removeAllMarkers() {
    shops.forEach((shop) => {
      removeShopMarker(shop)
      removeShopJobOrdersMarkers(shop)
      removeShopRunnersMarkers(shop)
    })
  }

  /* Function for clearing map without data reference */
  function clearMap(map: L.Map) {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) layer.remove()
      if (layer instanceof L.Polyline) layer.remove()
    })
  }

  /* Function for auto map fitting bounds */
  // function autoMapFitBounds(map: L.Map, bounds: L.LatLngBounds) {
  //   map.fitBounds(bounds)
  // }

  return { map, bounds, mapRef }
}

export default Controller
