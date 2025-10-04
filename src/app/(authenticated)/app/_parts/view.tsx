"use client";

import type { Session } from "next-auth";
import { SignOut } from "@/components/auth/SignOut";
import type { Report } from "@/lib/api/microcms";
import { useApp } from "./useApp";

type AppViewProps = {
  session: Session;
  reports: Report[];
};

export function AppView({ session, reports }: AppViewProps) {
  const { userName, reports: reportList } = useApp({ session, reports });

  return (
    <section>
      <h1>アプリ</h1>
      <p>{userName}</p>
      <SignOut />
      <section>
        <h2>レポート一覧</h2>
        <ul>
          {reportList.map((report) => (
            <li key={report.id}>
              <p>{report.title ?? report.guest}</p>
              <span>{report.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

