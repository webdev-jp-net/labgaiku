"use client";

import Link from "next/link";
import type { Report } from "@/lib/api/microcms";

type ReportsListViewProps = {
  reports: Report[];
};

export function ReportsListView({ reports }: ReportsListViewProps) {
  return (
    <section>
      <h1>レポート一覧</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <Link href={`/${report.id}`}>{report.title ?? report.guest}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

