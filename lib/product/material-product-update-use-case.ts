import { inject, injectable } from "inversify";
import ProductApi from "./product-api";
import {
  MaterialProductCreateDto,
  modelProductSchema,
} from "./product-create.dto";
import AuthApi from "../auth/auth-api";

@injectable()
class MaterialProductUpdateUseCase {
  constructor(
    @inject(ProductApi) private productApi: ProductApi,
    @inject(AuthApi) private authApi: AuthApi
  ) {}

  async execute(
    materialId: string,
    updatedData: Partial<MaterialProductCreateDto>
  ): Promise<{ success: boolean; error?: string }> {
    const userId = this.authApi.user?.id;
    if (!userId) {
      return { success: false, error: "Not logged in" };
    }

    const result = modelProductSchema.safeParse(updatedData);
    if (!result.success) {
      return { success: false, error: result.error.message };
    }

    return this.productApi.updateDocumentByProductId(
      materialId,
      updatedData,
      this.productApi.materialCollectionName
    );
  }
}

export default MaterialProductUpdateUseCase;
