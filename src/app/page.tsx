import { getServerSession } from "next-auth";
import { HomeView } from "./_parts/view";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <HomeView session={session} />;
}

