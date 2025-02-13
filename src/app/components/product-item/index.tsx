import './styles.scss'
import { Card, Image, Col, Typography, Button } from 'antd'
import { ProductItemProps } from './types'

const { Text } = Typography

const ProductItem = ({
  product,
  buttonTitle,
  buttonAction,
}: ProductItemProps) => {
  return (
    <Col className="gutter-row product-item" span={4}>
      <Card
        title={product.product_name || 'Product name not available'}
        bordered={false}
      >
        <p>
          <Text strong>Brand: </Text>
          <Text>{product.brands}</Text>
        </p>
        <p>
          <Text strong>Code: </Text>
          <Text>{product.code}</Text>
        </p>
        <p className="nutriscore-grade">
          <Text strong>Nutriscore Grade: </Text>
          <Text>{product.nutriscore_grade}</Text>
        </p>
        <Image
          height={200}
          width="100%"
          src={product.image_url}
          alt={product.product_name + '-image'}
        />
        <Button
          className="view-nutrition-facts"
          type="primary"
          size="large"
          onClick={() => buttonAction(product)}
          block
        >
          {buttonTitle}
        </Button>
      </Card>
    </Col>
  )
}

export default ProductItem
