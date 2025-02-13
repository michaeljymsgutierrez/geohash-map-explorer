import { useSearchParams } from 'next/navigation'

const Controller = () => {
  const searchParams = useSearchParams()
  const stringSearchParams = searchParams.get('string') || ''

  return { stringSearchParams }
}

export default Controller
