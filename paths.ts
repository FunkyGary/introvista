export const paths = {
    home: "/",
    auth: {
        signIn: "/auth/sign-in",
        signUp: "/auth/sign-up",
        resetPassword: "/auth/reset-password",
    },
    dashboard: {
        overview: "/dashboard",
        account: "/dashboard/account",
        products: "/admin/products",
        product: "/admin/product",
        integrations: "/dashboard/integrations",
        settings: "/dashboard/settings",
        orders: "/dashboard/orders",
        reviews: "/dashboard/reviews",
    },
    errors: { notFound: "/errors/not-found" },
} as const;
