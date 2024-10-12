import 'reflect-metadata'
import { Container } from "inversify";
import AuthApi from './auth/auth-api';
import ProductApi from "./product/product-api";
import ModelProductCreateUseCase from './product/model-product-create-use-case';
import MaterialProductCreateUseCase from './product/material-product-create-use-case';

export const initializeDIContainer = () => {
  const DIContainer = new Container();

  DIContainer.bind(AuthApi).toSelf().inSingletonScope();
  DIContainer.bind(ProductApi).toSelf().inSingletonScope();
  DIContainer.bind(ModelProductCreateUseCase).toSelf().inSingletonScope();
  DIContainer.bind(MaterialProductCreateUseCase).toSelf().inSingletonScope();

  return DIContainer;
};
