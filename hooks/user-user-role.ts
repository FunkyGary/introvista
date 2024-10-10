import * as React from "react";
import {
  type UserRoleContextValue,
  UserRoleContext,
} from "@/contexts/user-role-context";

export function useUserRole(): UserRoleContextValue {
  const context = React.useContext(UserRoleContext);

  if (!context) {
    throw new Error("useUser must be used within a UserRoleProvider");
  }

  return context;
}
