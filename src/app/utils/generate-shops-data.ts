import { faker } from '@faker-js/faker'
import { Shop, Coordinate, Profile } from '@app-types'

export default function generateShopsData() {
  const defaultMapLatitude = 14.563410240096365
  const defaultMapLongitude = 121.03664183824773
  const shops: Shop[] = []

  function generateRandomCoordinates(
    latCenter: number,
    lngCenter: number,
    radius?: number
  ): Coordinate {
    radius = radius || 0.009

    const offsetLat = (Math.random() - 0.5) * radius
    const offsetLng = (Math.random() - 0.5) * radius
    const randomLat = latCenter + offsetLat
    const randomLng = lngCenter + offsetLng
    return [randomLat, randomLng]
  }

  // const maxShopsCount = Math.floor(Math.random() * 20) + 1
  const maxShopsCount = 10
  // const maxRunnersCount = Math.floor(Math.random() * 50) + 1
  const maxRunnersCount = 5
  // const maxJobOrdersCount = Math.floor(Math.random() * 15) + 1
  const maxJobOrdersCount = 10

  /* Generate shops */
  for (let shopsCount = 0; shopsCount < maxShopsCount; shopsCount++) {
    const shop: Shop = {
      shopName: faker.company.name(),
      shopMarker: null,
      coordinates: generateRandomCoordinates(
        defaultMapLatitude,
        defaultMapLongitude
      ),
      runners: [],
      runnersMarkers: [],
      runnersPolylines: [],
      jobOrders: [],
      jobOrdersMarkers: [],
      isSelected: false,
    }

    /* Generate runners */
    for (let runnersCount = 0; runnersCount < maxRunnersCount; runnersCount++) {
      const runner = {
        fullName: faker.person.fullName(),
        coordinates: generateRandomCoordinates(
          shop.coordinates[0],
          shop.coordinates[1]
        ),
      }

      shop.runners.push(runner)
    }

    /* Generate job orders */
    for (
      let jobOrdersCount = 0;
      jobOrdersCount < maxJobOrdersCount;
      jobOrdersCount++
    ) {
      const randomShopRunnerIndex = Math.floor(Math.random() * maxRunnersCount)
      const jobOrder = {
        fullName: faker.person.fullName(),
        coordinates: generateRandomCoordinates(
          shop.coordinates[0],
          shop.coordinates[1]
        ),
        assignedRunners: [] as Profile[],
        assignedRunnersToJobOrderShopPolylines: [],
        isSelected: false,
      }

      if (jobOrdersCount % 2 === 0)
        jobOrder.assignedRunners.push(shop.runners[randomShopRunnerIndex])

      shop.jobOrders.push(jobOrder)
    }

    shops.push(shop)
  }

  return shops
}
