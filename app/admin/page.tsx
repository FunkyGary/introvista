import { redirect } from "next/navigation";

export default function Page(): never {
    redirect("/admin/products");
}
