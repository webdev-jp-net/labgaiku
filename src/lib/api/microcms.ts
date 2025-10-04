import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

export type ReportVisibility = "secret" | "limited" | "public";

export type Report = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  visibility: ReportVisibility;
  guest: string;
  date?: string;
  title?: string;
  content?: string;
};

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_KEY ?? "",
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? "",
});

export const getReports = async (queries?: MicroCMSQueries) =>
  client.getList<Report>({ endpoint: "report", queries });

export const getReportById = async (id: string, queries?: MicroCMSQueries) =>
  client.get<Report>({ endpoint: "report", contentId: id, queries });

