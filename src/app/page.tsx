import { getServerSession } from "next-auth";
import { getReports } from "@/lib/api/microcms";
import { authOptions } from "@/lib/auth";
import { HomeView } from "./_parts/view";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <HomeView session={null} reports={[]} />;
  }

  const reports = await getReports();

  return <HomeView session={session} reports={reports.contents} />;
}

