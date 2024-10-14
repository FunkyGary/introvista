import { inject, injectable } from "inversify";
import ProductApi from "./product-api";
import {
    FurnitureProductCreateDto,
    furnitureProductSchema,
} from "./product-create.dto";
import AuthApi from "../auth/auth-api";

@injectable()
class FurnitureModelProductCreateUseCase {
    constructor(
        @inject(ProductApi) private productApi: ProductApi,
        @inject(AuthApi) private authApi: AuthApi
    ) {}

    async execute(
        data: FurnitureProductCreateDto
    ): Promise<{ error?: string }> {
        const userId = this.authApi.user?.id;
        if (!userId) {
            return { error: "Not logged in" };
        }

        const result = furnitureProductSchema.safeParse(data);
        if (!result.success) {
            return { error: result.error.message };
        }

        return this.productApi.createFurnitureModelProduct(data, userId);
    }
}

export default FurnitureModelProductCreateUseCase;
