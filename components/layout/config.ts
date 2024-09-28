import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
    {
        key: "cart",
        title: "購物車",
        href: paths.dashboard.overview,
        icon: "shoppingCart",
    },
    {
        key: "cart",
        title: "訂單",
        href: paths.dashboard.overview,
        icon: "fileText",
    },
    {
        key: "vendor",
        title: "評價",
        href: paths.dashboard.reviews,
        icon: "star",
    },
    {
        key: "createProduct",
        title: "產品上架",
        href: paths.dashboard.product,
        icon: "boxArrowUp",
    },
    {
        key: "products",
        title: "產品列表",
        href: paths.dashboard.products,
        icon: "bagSimple",
    },
    {
        key: "orders",
        title: "訂單",
        href: paths.dashboard.orders,
        icon: "fileText",
    },
    {
        key: "review",
        title: "評價",
        href: paths.dashboard.integrations,
        icon: "star",
    },
    {
        key: "settings",
        title: "帳號設定",
        href: paths.dashboard.settings,
        icon: "user",
    },
    {
        key: "error",
        title: "系統設定",
        href: paths.errors.notFound,
        icon: "gear-six",
    },
    {
        key: "settings",
        title: "系統訂單",
        href: paths.dashboard.settings,
        icon: "fileText",
    },
] satisfies NavItemConfig[];
