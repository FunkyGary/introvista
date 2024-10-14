import "reflect-metadata";
import { Container } from "inversify";
import AuthApi from "./auth/auth-api";
import AuthClient from "./auth/client";
import ProductApi from "./product/product-api";
import MaterialProductCreateUseCase from "./product/material-product-create-use-case";
import ModelProductCreateUseCase from "./product/model-product-create-use-case";
import FurnitureFetchUseCase from "./product/model-fetch-use-case";

export const initializeDIContainer = () => {
    const DIContainer = new Container();

    DIContainer.bind(AuthApi).toSelf().inSingletonScope();
    DIContainer.bind(AuthClient).toSelf().inSingletonScope();

    DIContainer.bind(ProductApi).toSelf().inSingletonScope();
    DIContainer.bind(MaterialProductCreateUseCase).toSelf().inSingletonScope();
    DIContainer.bind(ModelProductCreateUseCase).toSelf().inSingletonScope();
    DIContainer.bind(FurnitureFetchUseCase).toSelf().inSingletonScope();

    return DIContainer;
};
