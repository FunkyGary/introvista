import { inject, injectable } from "inversify";
import ProductApi from "./product-api";
import AuthApi from "../auth/auth-api";

@injectable()
class MaterialProductDeleteUseCase {
  constructor(
    @inject(ProductApi) private productApi: ProductApi,
    @inject(AuthApi) private authApi: AuthApi
  ) {}

  async execute(materialId: string): Promise<{ success: boolean; error?: string }> {
    const userId = this.authApi.user?.id;
    if (!userId) {
      return { success: false, error: "Not logged in" };
    }

    return this.productApi.deleteMaterial(materialId);
  }
}

export default MaterialProductDeleteUseCase;
