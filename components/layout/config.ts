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
        key: "vendor",
        title: "廠商後台",
        href: paths.dashboard.customers,
        icon: "users",
    },
    // {
    //     key: "系統設定",
    //     title: "Integrations",
    //     href: paths.dashboard.integrations,
    //     icon: "plugs-connected",
    // },
    {
        key: "settings",
        title: "系統設定",
        href: paths.dashboard.settings,
        icon: "gear-six",
    },
    // {
    //     key: "account",
    //     title: "Account",
    //     href: paths.dashboard.account,
    //     icon: "user",
    // },
    // {
    //     key: "error",
    //     title: "Error",
    //     href: paths.errors.notFound,
    //     icon: "x-square",
    // },
] satisfies NavItemConfig[];
