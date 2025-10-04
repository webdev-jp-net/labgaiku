import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getReports } from "@/lib/api/microcms";
import { AppView } from "./_parts/view";

export default async function AppPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const reports = await getReports();

  return <AppView session={session} reports={reports.contents} />;
}

