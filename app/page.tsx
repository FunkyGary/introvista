import { Cart } from "@/components/dashboard/cart/cart";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-1">
            <Cart />
        </main>
    );
}
