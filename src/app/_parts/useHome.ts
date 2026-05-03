import type { Session } from "next-auth";
import type { ReportListItem } from "./view";

type UseHomeArgs = {
  session: Session | null;
  itemList: ReportListItem[];
};

export const useHome = ({ session, itemList }: UseHomeArgs) => {
  return {
    isAuthenticated: Boolean(session),
    itemList,
  };
};
