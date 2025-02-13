'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { NutritionFactsControllerProps } from './types'
import { Product } from '@app-types'

const Controller = ({
  queryProducts,
  queryProductNutritionFacts,
}: NutritionFactsControllerProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productKeyword, setProductKeyword] = useState<string>(
    (searchParams.get('product-keyword') as string) || ''
  )
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true)
  const [hasSeletedProduct, setHasSeletedProduct] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productNutritionFacts, setProductNutritionFacts] =
    useState<Product | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)

  const searchProducts = (keyword: string) => {
    router.push(`/dashboard/nutrition-facts?product-keyword=${keyword}`)
    queryProducts(keyword, 1).then((resultProducts) => {
      setPageCount(resultProducts.data.count)
      setProducts(resultProducts.data.products)
    })
  }

  const onViewProductNutritionFacts = (product: Product) => {
    setHasSeletedProduct(true)
    setSelectedProduct(product)
    queryProductNutritionFacts(product.code).then(
      (resultProductNutritionFacts) =>
        setProductNutritionFacts(resultProductNutritionFacts.data.product)
    )
  }
  const onNutiritionFactsModalOk = () => {
    setHasSeletedProduct(false)
    setSelectedProduct(null)
    setProductNutritionFacts(null)
  }
  const onNutritionFactsModalCancel = () => {
    setHasSeletedProduct(false)
    setSelectedProduct(null)
    setProductNutritionFacts(null)
  }

  useEffect(() => {
    if (!isPageLoading)
      searchProducts((searchParams.get('product-keyword') as string) || '')
    setIsPageLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageLoading])

  return {
    searchProducts,
    onViewProductNutritionFacts,
    onNutiritionFactsModalOk,
    onNutritionFactsModalCancel,
    productKeyword,
    products,
    pageCount,
    hasSeletedProduct,
    selectedProduct,
    productNutritionFacts,
  }
}

export default Controller
