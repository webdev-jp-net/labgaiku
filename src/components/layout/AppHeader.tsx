"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export function AppHeader() {
  const { status } = useSession();

  const handleClick = () => {
    if (status === "authenticated") {
      void signOut({ callbackUrl: "/" });
    } else {
      void signIn("google", { callbackUrl: "/" });
    }
  };

  const label = status === "authenticated" ? "ログアウト" : "ログイン";

  return (
    <header>
      <nav aria-label="グローバルナビゲーション">
        <Link href="/">TAMSAN Lab</Link>
        <button type="button" onClick={handleClick}>
          {label}
        </button>
      </nav>
    </header>
  );
}
 
