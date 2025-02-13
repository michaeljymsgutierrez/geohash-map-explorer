import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { CarryOutTwoTone, ShopTwoTone } from '@ant-design/icons'
import { ARM } from '@arm-config-wrapper'
import generateShopsData from '@utils/generate-shops-data'

const Controller = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shops = generateShopsData()

  const navOptions = [
    { label: 'Attendance', value: 'attendance', icon: <ShopTwoTone /> },
    { label: 'Dispatch', value: 'dispatch', icon: <CarryOutTwoTone /> },
  ]
  const onNavOptionClick = (value: string): void => {
    router.push(`/dashboard/monitoring?active-nav-button=${value}`)
  }
  const activeNavOptionValue = searchParams.get('active-nav-button') || ''
  const activeNavOption = ARM.findBy(navOptions, {
    value: activeNavOptionValue,
  })

  return {
    shops,
    activeNavOptionValue,
    activeNavOption,
    navOptions,
    onNavOptionClick,
  }
}

export default Controller
