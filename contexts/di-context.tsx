"use client";

import 'reflect-metadata'
import * as React from "react";
import { Provider } from "inversify-react";
import { initializeDIContainer } from "@/lib/di-container";

export interface DIProviderProps {
  children: React.ReactNode;
}

export function DIProvider({ children }: DIProviderProps): React.JSX.Element {
  return <Provider container={initializeDIContainer()}>{children}</Provider>;
}
