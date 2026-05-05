import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { getInterviewById } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewInterview } from '@/lib/permission'
import { InterviewDetailView } from './_parts/view'
import type { PublicInterview } from './_parts/view'

type InterviewDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function InterviewDetailPage({ params }: InterviewDetailPageProps) {
  const session = await getServerSession(authOptions)
  const { slug } = await params

  try {
    const interview = await getInterviewById(slug)
    if (!canViewInterview(interview, session)) {
      notFound()
    }
    const publicInterview: PublicInterview = {
      id: interview.id,
      createdAt: interview.createdAt,
      updatedAt: interview.updatedAt,
      publishedAt: interview.publishedAt,
      revisedAt: interview.revisedAt,
      guest: interview.guest,
      date: interview.date,
      title: interview.title,
      content: interview.content,
    }
    return <InterviewDetailView interview={publicInterview} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
