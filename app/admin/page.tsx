'use client';

import { Products } from "@/components/dashboard/products/products";
import withAuthRequired from "@/components/hoc/with-auth-required";

function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Products />
        </main>
    );
}

export default withAuthRequired(Page);
