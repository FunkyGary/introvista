import { inject, injectable } from 'inversify'
import ProductApi from './product-api'
import {
  MaterialProductCreateDto,
  modelProductSchema,
} from './product-create.dto'
import AuthApi from '../auth/auth-api'

@injectable()
class MaterialProductCreateUseCase {
  constructor(
    @inject(ProductApi) private productApi: ProductApi,
    @inject(AuthApi) private authApi: AuthApi
  ) {}

  async execute(data: MaterialProductCreateDto): Promise<{ error?: string }> {
    const userId = this.authApi.user?.id
    if (!userId) {
      return { error: 'Not logged in' }
    }

    const result = modelProductSchema.safeParse(data)
    if (!result.success) {
      return { error: result.error.message }
    }

    return this.productApi.createMaterialProduct(data, userId)
  }
}

export default MaterialProductCreateUseCase
