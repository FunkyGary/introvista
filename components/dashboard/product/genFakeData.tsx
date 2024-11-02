'use client'

import { createProductWithoutFiles } from '@/lib/actions/product'
import { useUser } from '@/hooks/use-user'
import { faker } from '@faker-js/faker'

export default function GenFakeData() {
  const { user } = useUser()
  const handleModel = () => {
    const modelData = {
      type: 'model',
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      weight: faker.number.float(),
      price: faker.commerce.price(),
      isPublished: faker.datatype.boolean(),
      userId: user?.id,
    }
    createProductWithoutFiles(modelData)
  }

  const handleMaterial = () => {
    const materialData = {
      type: 'material',
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      textureMaps: {
        baseColorMap: faker.image.url(),
        normalMap: faker.image.url(),
        heightMap: null,
      },
      image: faker.image.url(),
      weight: faker.number.float(),
      price: faker.commerce.price(),
      isPublished: faker.datatype.boolean(),
      userId: user?.id,
    }
    createProductWithoutFiles(materialData)
  }
  return (
    <div className="w-full">
      <div>genFakeData</div>
      <div className="flex gap-10 items-center">
        <button onClick={handleModel}>gen model</button>
        <button onClick={handleMaterial}>gen material</button>
      </div>
    </div>
  )
}
