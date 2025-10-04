import type { Session } from "next-auth";

export const useApp = (session: Session) => {
  return {
    userName: session.user?.name ?? "",
    userEmail: session.user?.email ?? "",
  };
};

