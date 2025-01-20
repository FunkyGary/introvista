export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forgetPassword: '/auth/forget-password',
  },
  dashboard: {
    overview: '/admin',
    account: '/admin/account',
    products: '/admin/products',
    product: '/admin/product',
    integrations: '/admin/integrations',
    settings: '/admin/settings',
    orders: '/admin/orders',
    reviews: '/admin/reviews',
    cart: '/admin/cart',
  },
  errors: { notFound: '/errors/not-found' },
} as const

export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/profile',
  },
  DESIGNER: {
    DASHBOARD: '/designer/dashboard',
    PROJECTS: {
      LIST: '/designer/projects',
      NEW: '/designer/projects/new',
      DETAILS: (id: string) => `/designer/projects/${id}`,
      EDIT: (id: string) => `/designer/projects/${id}/edit`,
    },
    MATERIALS: '/designer/materials',
    OBJECTS: '/designer/objects',
  },
  SUPPLIER: {
    DASHBOARD: '/supplier/dashboard',
    PRODUCTS: {
      LIST: '/supplier/products',
      NEW: '/supplier/products/new',
      DETAILS: (id: string) => `/supplier/products/${id}`,
      EDIT: (id: string) => `/supplier/products/${id}/edit`,
    },
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    PROJECTS: '/admin/projects',
    SUBSCRIPTIONS: '/admin/subscriptions',
    CATEGORIES: '/admin/categories',
    BRANDS: '/admin/brands',
  },
  ERROR: {
    NOT_FOUND: '/errors/not-found',
  },
} as const
