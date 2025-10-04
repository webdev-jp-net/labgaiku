import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppView } from "./_parts/view";
import { authOptions } from "@/lib/auth";

export default async function AppPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return <AppView session={session} />;
}

