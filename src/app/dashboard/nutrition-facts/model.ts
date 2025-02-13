'use client'

import { ARM } from '@arm-config-wrapper'

const Model = () => {
  const queryProducts = (keyword: string, page: number) => {
    return ARM.ajax({
      method: 'get',
      baseURL: 'https://world.openfoodfacts.org/cgi',
      url: '/search.pl',
      params: {
        search_terms: keyword,
        search_simple: 1,
        action: 'process',
        json: 1,
        fields: 'code,product_name,image_url,brands,nutriscore_grade',
        sort_by: 'uniq-mage"ue_scans_n',
        page_size: 30,
        page: page || 1,
      },
    })
  }

  const queryProductNutritionFacts = (code: string) => {
    return ARM.ajax({
      method: 'get',
      baseURL: 'https://world.openfoodfacts.org/api/v2',
      url: `/product/${code}/nutriments`,
      params: {
        fields:
          'nutriments,code,product_name,image_url,brands,nutriscore_grade',
      },
    })
  }

  return { queryProducts, queryProductNutritionFacts }
}

export default Model
