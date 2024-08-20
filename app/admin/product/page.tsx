import { Product } from "@/components/dashboard/product/product";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Product />
        </main>
    );
}
