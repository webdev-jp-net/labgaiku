import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SigninView } from "./_parts/view";
import { authOptions } from "@/lib/auth";

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/app");
  }

  return <SigninView />;
}

