import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

export type ReportVisibility = "secret" | "limited" | "public";

export type Report = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  visibility: ReportVisibility[];
  guest: string;
  date?: string;
  title?: string;
  content?: string;
  allowList?: string;
};

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is not set");
}

if (!apiKey) {
  throw new Error("MICROCMS_API_KEY is not set");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export const getReportList = async (queries?: MicroCMSQueries): Promise<Report[]> => {
  const response = await client.getList<Report>({ endpoint: "report", queries });
  return response.contents;
};

export const getReportById = async (id: string, queries?: MicroCMSQueries) =>
  client.get<Report>({ endpoint: "report", contentId: id, queries });

