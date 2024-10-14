"use client";

import { Product } from "@/components/dashboard/product/product";
import withAuthRequired from "@/components/hoc/with-auth-required";

function CreateProductPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Product />
        </main>
    );
}

export default withAuthRequired(CreateProductPage);
