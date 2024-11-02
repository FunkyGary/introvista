'use client'

import { createProductWithoutFiles } from '@/lib/actions/product'
import { useUser } from '@/hooks/use-user'
import { faker } from '@faker-js/faker'
import { throwDeprecation } from 'process'

export default function GenFakeData() {
  const { user } = useUser()
  const modelData = {
    modelName: faker.commerce.productName(),
    modelDescription: faker.commerce.productDescription(),
    throwDeprecation: faker.image.url(),
    weight: faker.number.float(),
    price: faker.commerce.price(),
    isPublished: faker.datatype.boolean(),
    userId: user?.id,
  }

  const materialData = {
    materialName: faker.commerce.productName(),
    materialDescription: faker.commerce.productDescription(),
    textureMaps: {
      baseColorMap: faker.image.url(),
      normalMap: faker.image.url(),
      heightMap: null,
    },
    previewImage: faker.image.url(),
    weight: faker.number.float(),
    materialPrice: faker.commerce.price(),
    isPublished: faker.datatype.boolean(),
    userId: user?.id,
  }

  const handleModel = () => {
    createProductWithoutFiles('models', modelData)
  }
  const handleMaterial = () => {
    createProductWithoutFiles('materials', materialData)
  }

  return (
    <div className="w-full">
      <div>genFakeData</div>
      <div className="flex justify-around">

      <button onClick={handleModel}>gen model</button>
      <button onClick={handleMaterial}>gen material</button>
      </div>
    </div>
  )
}
