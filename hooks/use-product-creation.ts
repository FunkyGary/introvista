import MaterialProductCreateUseCase from "@/lib/product/material-product-create-use-case";
import FurnitureProductCreateUseCase from "@/lib/product/furniture-product-create-use-case";
import { ProductCreateDto } from "@/lib/product/product-create.dto";
import { useInjection } from "inversify-react";
import React from "react";

export const useProductCreation = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const furnitureProductCreateUseCase = useInjection(
        FurnitureProductCreateUseCase
    );
    const materialProductCreateUseCase = useInjection(
        MaterialProductCreateUseCase
    );

    const createProduct = async (
        category: string,
        data: ProductCreateDto
    ): Promise<{ error?: string }> => {
        setIsSubmitting(true);
        try {
            if (category === "furniture") {
                await furnitureProductCreateUseCase.execute(data as any);
            } else {
                await materialProductCreateUseCase.execute(data as any);
            }
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }
            return { error: "Something went wrong" };
        } finally {
            setIsSubmitting(false);
        }
        return {};
    };

    const updateProduct = async (
        id: string,
        category: string,
        data: ProductCreateDto
    ): Promise<{ error?: string }> => {
        setIsSubmitting(true);
        try {
            // Implement update logic here
            // You might need to create new use cases for updating products
            console.log(`Updating ${category} product with id ${id}`);
            // For now, we'll just simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }
            return { error: "Something went wrong during update" };
        } finally {
            setIsSubmitting(false);
        }
        return {};
    };

    const deleteProduct = async (id: string): Promise<{ error?: string }> => {
        setIsDeleting(true);
        try {
            // Implement delete logic here
            // You might need to create a new use case for deleting products
            console.log(`Deleting product with id ${id}`);
            // For now, we'll just simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }
            return { error: "Something went wrong during deletion" };
        } finally {
            setIsDeleting(false);
        }
        return {};
    };

    return {
        isCreatingProduct: isSubmitting,
        isDeletingProduct: isDeleting,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
