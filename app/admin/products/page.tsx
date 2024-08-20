import { Products } from "@/components/dashboard/products/products";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Products />
        </main>
    );
}
