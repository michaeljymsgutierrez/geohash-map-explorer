import { Product } from '@app-types'

export interface ProductsResults {
  count: number
  page: number
  page_count: number
  page_size: number
  skip: number
  products: Product[]
}

export interface ProductNutritionFactsResults {
  code: string
  product: Product
}

interface ProductsResultsApiResponse {
  data: ProductsResults
  status: number
  statusText: string
  headers: Headers
}

interface ProductNutritionFactsApiResponse {
  data: ProductNutritionFactsResults
  status: number
  statusText: string
  headers: Headers
}

export interface NutritionFactsControllerProps {
  queryProducts: (
    keyword: string,
    pageNumber: number
  ) => Promise<ProductsResultsApiResponse>

  queryProductNutritionFacts: (
    code: string
  ) => Promise<ProductNutritionFactsApiResponse>
}
