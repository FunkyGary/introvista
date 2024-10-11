import { Products } from "@/components/dashboard/products/products";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "IntroVista",
    description: "IntroVista",
};

function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Products />
        </main>
    );
}

export default Page;
