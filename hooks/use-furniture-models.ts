import { Model } from "@/lib/product/model.entity";
import FurnitureModelsFetchUseCase from "@/lib/product/furniture-models-fetch-use-case";
import { useInjection } from "inversify-react";
import React from "react";

export const useFurnitureModels = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [furnitureModels, setFurnitureModels] = React.useState<
    Model[]
  >([]);
  const fetchFurnitureModelsUseCase = useInjection(
    FurnitureModelsFetchUseCase
  );
  const fetchFurnitureModels = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const furnitureModels = await fetchFurnitureModelsUseCase.execute();
      setFurnitureModels(furnitureModels);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchFurnitureModels();
  }, [fetchFurnitureModels]);

  return {
    loadingFurnitureModels: isLoading,
    fetchFurnitureModels,
    furnitureModels,
  };
};
