import { Product } from '@app-types'

export interface NutritionFactsModalProps {
  isOpen: boolean
  product: Product | null
  productNutritionFacts: Product | null
  buttonActionOk: () => void
  buttonActionCancel: () => void
}
