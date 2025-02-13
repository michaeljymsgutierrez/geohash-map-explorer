import { useState, useEffect } from 'react'
import { ARM } from '@arm-config-wrapper'
import { Shop, JobOrder } from '@app-types'

const Controller = (shops: Shop[]) => {
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([])

  useEffect(() => {
    const shopsJobOrders = shops.map((shop) => shop.jobOrders)
    const allShopsJobOrders = ARM.mergeObjects(...shopsJobOrders)
    setJobOrders(allShopsJobOrders)
  }, [shops])

  return { jobOrders }
}

export default Controller
