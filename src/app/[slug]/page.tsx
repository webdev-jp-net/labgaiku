import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getReportById } from "@/lib/api/microcms";
import { ReportDetailView } from "../reports/_parts/detail-view";
import { authOptions } from "@/lib/auth";

type ReportDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const { slug } = params;

  try {
    const report = await getReportById(slug);
    return <ReportDetailView report={report} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

