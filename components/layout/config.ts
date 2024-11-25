import type { NavItemConfig } from "@/types/nav"
import { paths } from "@/paths"

export const getNavItems = (role: string): NavItemConfig[] => {
  switch (role) {
    case "designer":
      return [
        {
          key: "cart",
          title: "購物車",
          href: paths.dashboard.cart,
          icon: "shoppingCart",
        },
        {
          key: "order",
          title: "訂單",
          href: paths.dashboard.overview,
          icon: "fileText",
        },
        {
          key: "orderReviews",
          title: "評價",
          href: paths.dashboard.reviews,
          icon: "star",
        },
        {
          key: "accountSettings",
          title: "帳號設定",
          href: paths.dashboard.account,
          icon: "user",
        },
      ]

    case "seller":
      return [
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
          key: "sellerReview",
          title: "評價",
          href: paths.dashboard.integrations,
          icon: "star",
        },
        {
          key: "accountSettings",
          title: "帳號設定",
          href: paths.dashboard.account,
          icon: "user",
        },
      ]

    case "admin":
      return [
        {
          key: "systemOrder",
          title: "系統訂單",
          href: paths.dashboard.settings,
          icon: "fileText",
        },
        {
          key: "settings",
          title: "系統設定",
          href: paths.dashboard.settings,
          icon: "gear-six",
        },
      ]

    default:
      return []
  }
}

export const navItems = [
  {
    key: "cart",
    title: "購物車",
    href: paths.dashboard.cart,
    icon: "shoppingCart",
  },
  {
    key: "order",
    title: "訂單",
    href: paths.dashboard.overview,
    icon: "fileText",
  },
  {
    key: "orderReviews",
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
    key: "sellerReview",
    title: "評價",
    href: paths.dashboard.integrations,
    icon: "star",
  },
  {
    key: "accountSettings",
    title: "帳號設定",
    href: paths.dashboard.account,
    icon: "user",
  },
  {
    key: "settings",
    title: "系統設定",
    href: paths.dashboard.settings,
    icon: "gear-six",
  },
  {
    key: "systemOrder",
    title: "系統訂單",
    href: paths.dashboard.settings,
    icon: "fileText",
  },
] satisfies NavItemConfig[]
