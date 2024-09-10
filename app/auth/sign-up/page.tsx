import * as React from "react";
import type { Metadata } from "next";

import { Layout } from "@/components/auth/layout";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
    title: `Sign up | Auth | introvista`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Layout>
            <SignUpForm />
        </Layout>
    );
}
