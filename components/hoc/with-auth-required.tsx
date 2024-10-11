"use client";

import { useUser } from "@/hooks/use-user";
import AuthRedirect from "@/lib/auth/auth-redirect";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function withAuthRequired(
  WrappedComponent: React.FC<any> | React.ComponentClass<any, any>,
  options?: {
    afterLoginPath?: string;
  }
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuthRequired = (props: any) => {
    const router = useRouter();
    const session = useUser();

    React.useEffect(() => {
      if (!session.isLoading && !session.user) {
        const authGuardRedirectPath = AuthRedirect.formatAuthRedirectPath({
          afterLogin: options?.afterLoginPath,
        });

        router.push(authGuardRedirectPath);
      }
    }, [router, session.isLoading, session.user]);

    if (session.isLoading || !session.user) {
      return (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    return <WrappedComponent {...props} />;
  };
  ComponentWithAuthRequired.displayName = `withAuthRequired(${displayName})`;

  return ComponentWithAuthRequired;
}
