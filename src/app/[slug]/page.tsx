import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getReportById } from "@/lib/api/microcms";
import { authOptions } from "@/lib/auth";
import { ReportArticleView } from "./_parts/view";

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
    return <ReportArticleView report={report} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

