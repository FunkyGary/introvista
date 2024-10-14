import { inject, injectable } from "inversify";
import { Furniture } from "./model.entity";
import ProductApi from "./product-api";

@injectable()
class FurnitureFetchUseCase {
    constructor(@inject(ProductApi) private productApi: ProductApi) {}

    async execute(): Promise<Furniture[]> {
        const furnitures = await this.productApi.getFurnitures();
        return furnitures;
    }
}

export default FurnitureFetchUseCase;
