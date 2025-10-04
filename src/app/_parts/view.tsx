"use client";

import type { Session } from "next-auth";
import Link from "next/link";
import type { Report } from "@/lib/api/microcms";
import { useHome } from "./useHome";

type HomeViewProps = {
  session: Session | null;
  reports: Report[];
};

export function HomeView({ session, reports }: HomeViewProps) {
  const { isAuthenticated, reports: reportList } = useHome({ session, reports });

  if (!isAuthenticated) {
    return (
      <section>
        <h1>レポート一覧</h1>
        <p>閲覧するにはログインしてください。</p>
      </section>
    );
  }

  return (
    <section>
      <h1>レポート一覧</h1>
      <ul>
        {reportList.map((report) => (
          <li key={report.id}>
            <Link href={`/${report.id}`}>{report.title ?? report.guest}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

