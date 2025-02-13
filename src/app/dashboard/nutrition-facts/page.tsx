'use client'

import './styles.scss'
import { Layout, Input, Row, Affix } from 'antd'
import Controller from './controller'
import Model from './model'
import ProductItem from '@components/product-item'
import NutritionFactsModal from '@components/nutrition-facts-modal'

const { Header, Content } = Layout
const { Search } = Input

const NutritionFactsPage = () => {
  const model = Model()
  const controller = Controller(model)

  return (
    <div className="nutrition-facts-page">
      <Layout>
        <Affix offsetTop={0}>
          <Header className="header-container">
            <Search
              defaultValue={controller.productKeyword}
              onSearch={controller.searchProducts}
              className="header-search"
              placeholder="Enter product name ie. Star margarine"
              enterButton="Search"
              size="large"
              allowClear
            />
          </Header>
        </Affix>
        <Content className="content-container">
          <Row gutter={[20, 10]}>
            {controller.products.map((product, index) => (
              <ProductItem
                key={index}
                product={product}
                buttonTitle="View Nutrition Facts"
                buttonAction={controller.onViewProductNutritionFacts}
              />
            ))}
          </Row>
        </Content>
      </Layout>
      {controller.hasSeletedProduct && (
        <NutritionFactsModal
          product={controller.selectedProduct}
          productNutritionFacts={controller.productNutritionFacts}
          isOpen={controller.hasSeletedProduct}
          buttonActionOk={controller.onNutiritionFactsModalOk}
          buttonActionCancel={controller.onNutritionFactsModalCancel}
        />
      )}
    </div>
  )
}

// <Affix offsetBottom={0}>
//   <div className="pagination-container">
//     <Pagination
//       simple={{ readOnly: true }}
//       defaultCurrent={1}
//       total={controller.pageCount}
//       showSizeChanger={false}
//       showQuickJumper={false}
//       onChange={(e) => {
//         console.log(e)
//       }}
//     />
//   </div>
// </Affix>

export default NutritionFactsPage
