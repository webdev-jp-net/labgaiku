"use client";

import type { Session } from "next-auth";
import { SignOut } from "@/components/auth/SignOut";
import { useApp } from "./useApp";

type AppViewProps = {
  session: Session;
};

export function AppView({ session }: AppViewProps) {
  const { userName } = useApp(session);

  return (
    <section>
      <h1>アプリ</h1>
      <p>{userName}</p>
      <SignOut />
    </section>
  );
}

