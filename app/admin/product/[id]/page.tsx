"use client";

import { Product } from "@/components/dashboard/product/Product";
import withAuthRequired from "@/components/hoc/with-auth-required";
import { notFound } from "next/navigation";

function ProductPage({ params }: { params: { id: string } }) {
    const productId = params.id;

    // Fetch the product data
    const product = {
        modelName: "Sample Furniture",
        category: "Furniture",
    };

    if (!product) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Product initialData={product} productId={productId} />
        </main>
    );
}

export default withAuthRequired(ProductPage);
