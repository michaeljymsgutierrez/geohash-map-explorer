import { Product } from '@app-types'

export interface ProductItemProps {
  product: Product
  buttonTitle: string
  buttonAction: (product: Product) => void
}
