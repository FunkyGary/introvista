"use client";

import * as React from "react";

import type { UserRole } from "@/types/user-role";
import { useAuthClient } from "@/hooks/use-auth-client";

export interface UserRoleContextValue {
  userRole: UserRole | null;
  error: string | null;
  isLoading: boolean;
  checkSessionRole?: () => Promise<void>;
}

export const UserRoleContext = React.createContext<
  UserRoleContextValue | undefined
>(undefined);

export interface UserRoleProviderProps {
  children: React.ReactNode;
}

export function UserRoleProvider({
  children,
}: UserRoleProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    userRole: UserRole | null;
    error: string | null;
    isLoading: boolean;
  }>({
    userRole: null,
    error: null,
    isLoading: true,
  });

  const authClient = useAuthClient();
  const checkSessionRole = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUserRole();

      if (error) {
        setState((prev) => ({
          ...prev,
          userRole: null,
          error: "Something went wrong",
          isLoading: false,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        userRole: data ?? null,
        error: null,
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        userRole: null,
        error: "Something went wrong",
        isLoading: false,
      }));
    }
  }, []);

  React.useEffect(() => {
    checkSessionRole().catch((err: unknown) => {
      console.log(err);
    });
  }, [checkSessionRole]);

  React.useEffect(() => {
    authClient.onUserChange((user) => {
      setState((prev) => ({
        ...prev,
        user,
        error: null,
        isLoading: false,
      }));
    });
  }, []);

  return (
    <UserRoleContext.Provider value={{ ...state, checkSessionRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const UserConsumer = UserRoleContext.Consumer;
