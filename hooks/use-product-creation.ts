import MaterialProductCreateUseCase from "@/lib/product/material-product-create-use-case";
import ModelProductCreateUseCase from "@/lib/product/model-product-create-use-case";
import { ProductCreateDto } from "@/lib/product/product-create.dto";
import { useInjection } from "inversify-react";
import React from "react";

export const useProductCreation = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const modelProductCreateUseCase = useInjection(ModelProductCreateUseCase);
  const materialProductCreateUseCase = useInjection(
    MaterialProductCreateUseCase
  );

  const createProduct = async (
    category: string,
    data: ProductCreateDto
  ): Promise<{ error?: string }> => {
    setIsSubmitting(true);
    try {
      if (category === "furnitureModel") {
        await modelProductCreateUseCase.execute(data as any);
      } else {
        await materialProductCreateUseCase.execute(data as any);
      }
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }

      return { error: "Something went wrong" };
    }
    setIsSubmitting(false);

    return {};
  };

  return {
    isCreatingProduct: isSubmitting,
    createProduct,
  };
};
