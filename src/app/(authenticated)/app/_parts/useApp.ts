import type { Session } from "next-auth";
import type { Report } from "@/lib/api/microcms";

type UseAppArgs = {
  session: Session;
  reports: Report[];
};

export const useApp = ({ session, reports }: UseAppArgs) => {
  return {
    userName: session.user?.name ?? "",
    userEmail: session.user?.email ?? "",
    reports,
  };
};

