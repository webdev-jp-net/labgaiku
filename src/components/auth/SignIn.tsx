"use client";

import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <button type="button" onClick={() => signIn("google")}>ログイン</button>
  );
}

