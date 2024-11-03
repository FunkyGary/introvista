import { inject, injectable } from "inversify";
import { Model } from "./model.entity";
import ProductApi from "./product-api";

@injectable()
class FurnitureModelsFetchUseCase {
    constructor(@inject(ProductApi) private productApi: ProductApi) {}

    async execute(): Promise<Model[]> {
        const furnitureModels = await this.productApi.getFurnitureModels();
        return furnitureModels;
    }
}

export default FurnitureModelsFetchUseCase;
