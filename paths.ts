export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    forgetPassword: "/auth/forget-password",
  },
  dashboard: {
    overview: "/admin",
    account: "/admin/account",
    products: "/admin/products",
    product: "/admin/product",
    integrations: "/admin/integrations",
    settings: "/admin/settings",
    orders: "/admin/orders",
    reviews: "/admin/reviews",
    cart: "/admin/cart",
  },
  errors: { notFound: "/errors/not-found" },
} as const
