import { getServerSession } from "next-auth";
import { getReports } from "@/lib/api/microcms";
import { authOptions } from "@/lib/auth";
import { ReportsListView } from "./reports/_parts/list-view";

export default async function ReportsIndexPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section>
        <h1>レポート一覧</h1>
        <p>閲覧するにはログインしてください。</p>
      </section>
    );
  }

  const reports = await getReports();

  return <ReportsListView reports={reports.contents} />;
}
 