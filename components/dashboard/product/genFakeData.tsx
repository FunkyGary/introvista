"use client"

import { createProductWithoutFiles } from "@/lib/actions/product"
import { useUser } from "@/hooks/use-user"
import { faker } from "@faker-js/faker"

export default function GenFakeData() {
  const { user } = useUser()
  const handleModel = () => {
    const modelData = {
      type: "model",
      tags: faker.helpers.arrayElements([
        "office",
        "furniture",
        "ergonomic",
        "modern",
      ]),
      modelName: faker.commerce.productName(),
      categoryID: faker.string.uuid(),
      supplierID: faker.string.uuid(),
      brandID: faker.string.uuid(),
      modelDescription: faker.commerce.productDescription(),
      modelFiles: {
        modelFileGLB: faker.internet.url(),
        modelFileUSD: faker.internet.url(),
        additionalFiles: [faker.internet.url(), faker.internet.url()],
      },
      thumbnailImage: faker.image.url(),
      dimensions: {
        length: faker.number.float({ min: 0.5, max: 2.0 }),
        width: faker.number.float({ min: 0.5, max: 2.0 }),
        height: faker.number.float({ min: 0.5, max: 2.0 }),
      },
      weight: faker.number.float({ min: 1, max: 20 }),
      price: faker.commerce.price(),
      isPublished: faker.datatype.boolean(),
      createdDate: faker.date.past(),
      lastUpdated: faker.date.recent(),
      userId: user?.id,
    }

    createProductWithoutFiles("models", modelData)
  }

  const handleMaterial = () => {
    const materialData = {
      type: "material",
      materialID: faker.string.uuid(),
      tags: faker.helpers.arrayElements(["wood", "metal", "plastic", "fabric"]),
      materialName: faker.commerce.productName(),
      categoryID: faker.string.uuid(),
      supplierID: faker.string.uuid(),
      brandID: faker.string.uuid(),
      materialDescription: faker.commerce.productDescription(),
      textureMaps: {
        baseColorMap: faker.image.url(),
        normalMap: faker.image.url(),
        roughnessMap: faker.image.url(),
        metallicMap: faker.image.url(),
        ambientOcclusionMap: faker.image.url(),
        heightMap: faker.image.url(),
      },
      previewImage: faker.image.url(),
      dimensions: {
        length: faker.number.float({ min: 0.1, max: 5.0 }),
        width: faker.number.float({ min: 0.1, max: 5.0 }),
        height: faker.number.float({ min: 0.1, max: 5.0 }),
      },
      weight: faker.number.float({ min: 0.1, max: 5.0 }),
      materialPrice: faker.commerce.price(),
      isPublished: faker.datatype.boolean(),
      createdDate: faker.date.past(),
      lastUpdated: faker.date.recent(),
      userId: user?.id,
    }

    createProductWithoutFiles("materials", materialData)
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
