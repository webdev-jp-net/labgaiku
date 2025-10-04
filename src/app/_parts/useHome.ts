import type { Session } from "next-auth";
import type { Report } from "@/lib/api/microcms";

type UseHomeArgs = {
  session: Session | null;
  reports: Report[];
};

export const useHome = ({ session, reports }: UseHomeArgs) => {
  return {
    isAuthenticated: Boolean(session),
    reports,
  };
};

