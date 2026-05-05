import * as cheerio from 'cheerio'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { getInterviewById } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewInterview } from '@/lib/permission'
import { LoginPrompt } from './_parts/components/LoginPrompt'
import { InterviewDetailView } from './_parts/view'
import type { InterviewTocItem, PublicInterview } from './_parts/view'

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
      const callbackUrl = `/interview/${slug}`
      return <LoginPrompt callbackUrl={callbackUrl} />
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

    const $ = cheerio.load(interview.content ?? '')
    const toc: InterviewTocItem[] = $('h1, h2, h3')
      .toArray()
      .map(el => ({
        id: el.attribs.id,
        text: $(el).text(),
      }))

    return <InterviewDetailView interview={publicInterview} toc={toc} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
