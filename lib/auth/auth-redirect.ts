import { paths } from "@/paths";

const searchParamsKeys = {
  beforeLogin: "before-login",
  afterLogin: "after-login",
}

class AuthRedirect {
  static formatAuthRedirectPath(redirectPaths: {
    beforeLogin?: string;
    afterLogin?: string;
  }): string {
    const defaultAfterLoginPath =
      window.location.pathname + window.location.search;
    const afterLoginPath = redirectPaths.afterLogin ?? defaultAfterLoginPath;
    const beforeLoginPath = redirectPaths.beforeLogin ?? paths.home;

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(searchParamsKeys.beforeLogin, beforeLoginPath);
    searchParams.set(searchParamsKeys.afterLogin, afterLoginPath);

    return `${paths.auth.signIn}?${searchParams.toString()}`;
  }

  static getAfterLoginPath(): string {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(searchParamsKeys.afterLogin) ?? paths.home;
  }
}

export default AuthRedirect;
