import { inject, injectable } from 'inversify'
import { FurnitureModel } from './model.entity'
import ProductApi from './product-api'

@injectable()
class FurnitureModelsFetchUseCase {
  constructor(@inject(ProductApi) private productApi: ProductApi) {}

  async execute(): Promise<FurnitureModel[]> {
    const furnitureModels = await this.productApi.getFurnitureModels()
    return furnitureModels
  }
}

export default FurnitureModelsFetchUseCase
