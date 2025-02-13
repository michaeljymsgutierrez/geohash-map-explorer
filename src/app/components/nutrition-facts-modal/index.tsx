import './styles.scss'
import { Modal } from 'antd'
import { NutritionFactsModalProps } from './types'

const NutritionFactsModal = ({
  isOpen,
  product,
  productNutritionFacts,
  buttonActionOk,
  buttonActionCancel,
}: NutritionFactsModalProps) => {
  return (
    <Modal
      className="nutrition-facts-modal"
      title={product?.product_name || 'Product name not available'}
      open={isOpen}
      onOk={buttonActionOk}
      onCancel={buttonActionCancel}
    >
      <div className="nutrition-facts-container">
        <h3>Nutrition Facts</h3>
        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Energy</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.energy_value}&nbsp;
            {productNutritionFacts?.nutriments.energy_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">
            Carbohydrates
          </div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.carbohydrates_value}&nbsp;
            {productNutritionFacts?.nutriments.carbohydrates_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Proteins</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.proteins_value}&nbsp;
            {productNutritionFacts?.nutriments.proteins_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Fats</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.fat_value}&nbsp;
            {productNutritionFacts?.nutriments.fat_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Sodium</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.sodium_value}&nbsp;
            {productNutritionFacts?.nutriments.sodium_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Salt</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.salt_value}&nbsp;
            {productNutritionFacts?.nutriments.salt_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Sugar</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.salt_value}&nbsp;
            {productNutritionFacts?.nutriments.salt_unit}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">
            Saturated Fat
          </div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments['saturated-fat_value']}&nbsp;
            {productNutritionFacts?.nutriments['saturated-fat_unit']}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Fiber</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments.fiber_modifier || 'n/a'}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">
            Fruits vegetables legumes
          </div>
          <div className="nutrition-facts-details-item-value">
            {
              productNutritionFacts?.nutriments[
                'fruits-vegetables-legumes-estimate-from-ingredients_serving'
              ]
            }
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">
            Fruits vegetables nuts
          </div>
          <div className="nutrition-facts-details-item-value">
            {
              productNutritionFacts?.nutriments[
                'fruits-vegetables-nuts-estimate-from-ingredients_serving'
              ]
            }
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">
            Nutrition score FR
          </div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments['nutrition-score-fr']}
          </div>
        </div>

        <div className="nutrition-facts-details">
          <div className="nutrition-facts-details-item-label">Nova Group</div>
          <div className="nutrition-facts-details-item-value">
            {productNutritionFacts?.nutriments['nova-group'] || 'n/a'}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NutritionFactsModal
