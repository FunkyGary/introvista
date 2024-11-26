import { paths } from '@/paths'

const searchParamsKeys = {
  afterLogin: 'after-login',
}

class AuthRedirect {
  static formatAuthRedirectPath(redirectPaths: {
    afterLogin?: string
  }): string {
    const defaultAfterLoginPath =
      window.location.pathname + window.location.search
    const afterLoginPath = redirectPaths.afterLogin ?? defaultAfterLoginPath

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(searchParamsKeys.afterLogin, afterLoginPath)

    return `${paths.auth.signIn}?${searchParams.toString()}`
  }

  static getAfterLoginPath(): string {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(searchParamsKeys.afterLogin) ?? paths.home
  }
}

export default AuthRedirect
