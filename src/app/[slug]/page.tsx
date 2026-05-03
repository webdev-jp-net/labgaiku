import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getReportById } from "@/lib/api/microcms";
import { authOptions } from "@/lib/auth";
import { canViewReport } from "@/lib/permissions";
import { ReportArticleView } from "./_parts/view";
import type { PublicReport } from "./_parts/view";

type ReportDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;

  try {
    const report = await getReportById(slug);
    if (!canViewReport(report, session)) {
      notFound();
    }
    const publicReport: PublicReport = {
      id: report.id,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
      publishedAt: report.publishedAt,
      revisedAt: report.revisedAt,
      guest: report.guest,
      date: report.date,
      title: report.title,
      content: report.content,
    };
    return <ReportArticleView report={publicReport} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
