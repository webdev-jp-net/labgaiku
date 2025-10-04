"use client";

import type { Report } from "@/lib/api/microcms";
import { sanitizeHtml } from "@/lib/sanitize";

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
            __html: sanitizeHtml(report.content ?? ""),
          }}
        />
      </section>
    </article>
  );
}

