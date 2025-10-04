"use client";

import type { Report } from "@/lib/api/microcms";

type ReportDetailViewProps = {
  report: Report;
};

export function ReportDetailView({ report }: ReportDetailViewProps) {
  return (
    <article>
      <header>
        <h1>{report.title ?? report.guest}</h1>
        {report.date && <time dateTime={report.date}>{report.date}</time>}
      </header>
      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: report.content ?? "",
          }}
        />
      </section>
    </article>
  );
}

