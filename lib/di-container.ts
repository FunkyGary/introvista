import 'reflect-metadata'
import { Container } from "inversify";
import AuthApi from './auth/auth-api';
import ProductApi from "./product/product-api";
import MaterialProductCreateUseCase from './product/material-product-create-use-case';
import FurnitureModelProductCreateUseCase from './product/furniture-model-product-create-use-case';
import FurnitureModelsFetchUseCase from './product/furniture-models-fetch-use-case';

export const initializeDIContainer = () => {
  const DIContainer = new Container();

  DIContainer.bind(AuthApi).toSelf().inSingletonScope();
  DIContainer.bind(ProductApi).toSelf().inSingletonScope();
  
  DIContainer.bind(MaterialProductCreateUseCase).toSelf().inSingletonScope();
  DIContainer.bind(FurnitureModelProductCreateUseCase).toSelf().inSingletonScope();
  DIContainer.bind(FurnitureModelsFetchUseCase).toSelf().inSingletonScope();

  return DIContainer;
};
