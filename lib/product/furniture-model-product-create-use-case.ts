import { inject, injectable } from "inversify";
import ProductApi from "./product-api";
import {
  ModelProductCreateDto,
  modelProductSchema,
} from "./product-create.dto";
import AuthApi from "../auth/auth-api";

@injectable()
class FurnitureModelProductCreateUseCase {
  constructor(
    @inject(ProductApi) private productApi: ProductApi,
    @inject(AuthApi) private authApi: AuthApi
  ) {}

  async execute(data: ModelProductCreateDto): Promise<{ error?: string }> {
    const userId = this.authApi.auth.currentUser?.uid;
    if (!userId) {
      return { error: "Not logged in" };
    }

    const result = modelProductSchema.safeParse(data);
    if (!result.success) {
      return { error: result.error.message };
    }

    return this.productApi.createFurnitureModelProduct(data, userId);
  }
}

export default FurnitureModelProductCreateUseCase;
