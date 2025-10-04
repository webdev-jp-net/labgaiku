import type { Session } from "next-auth";

type HomeLinksOptions = {
  session: Session | null;
};

export const useHome = ({ session }: HomeLinksOptions) => {
  if (session) {
    return {
      links: [{ href: "/app", label: "アプリ" }],
    };
  }

  return {
    links: [{ href: "/api/auth/signin?callbackUrl=%2Fapp", label: "Googleでサインイン" }],
  };
};

