"use client";

import { SignIn } from "@/components/auth/SignIn";
import { useSignin } from "./useSignin";

export function SigninView() {
  const { heading } = useSignin();

  return (
    <section>
      <h1>{heading}</h1>
      <SignIn />
    </section>
  );
}

