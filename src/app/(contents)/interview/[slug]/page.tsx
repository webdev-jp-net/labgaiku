import * as cheerio from 'cheerio'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { getInterviewById } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewInterview } from '@/lib/permission'
import { WordUnit } from '@/components/WordUnit'
import { LoginPrompt } from './_parts/components/LoginPrompt'
import { InterviewDetailView } from './_parts/view'
import type { InterviewTocItem, PublicInterview } from './_parts/view'

const buildTitle = (raw: string) => {
  const i = raw.indexOf('——')
  if (i < 0) return <WordUnit>{raw}</WordUnit>
  return (
    <>
      <WordUnit>{raw.slice(0, i)}</WordUnit>
      <small>
        <WordUnit>{raw.slice(i)}</WordUnit>
      </small>
    </>
  )
}

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
    const $ = cheerio.load(interview.content ?? '')

    const namePattern = /^([^\x00-\x7F]+?)[:：](.*)$/s
    const colonPattern = /^[:：]\s*/
    $('p').each((_, el) => {
      const $p = $(el)
      const nodes = $p.contents().toArray()
      if (nodes.length === 0) return
      const first = nodes[0]

      // ケース1: 先頭が text node で「名前 + コロン」を含む
      if (first.type === 'text') {
        const match = first.data.match(namePattern)
        if (!match) return
        const [, name, rest] = match
        first.data = rest.replace(/^\s+/, '')
        const ddHtml = $p.html() ?? ''
        $p.replaceWith(`<dl><dt>${name}</dt><dd>${ddHtml}</dd></dl>`)
        return
      }

      // ケース2: 先頭 element の text がマルチバイト文字のみ + 直後 text がコロンで始まる
      if (first.type === 'tag') {
        const elText = $(first).text()

        // ケース3: 先頭 element 内に「名前 + コロン」がすべて入っている
        const elInnerMatch = elText.match(/^([^\x00-\x7F]+?)[:：]\s*$/)
        if (elInnerMatch) {
          const [, name] = elInnerMatch
          $(first).remove()
          const remaining = $p.contents().first()
          if (remaining.length > 0 && remaining[0].type === 'text') {
            remaining[0].data = remaining[0].data.replace(/^\s+/, '')
          }
          const ddHtml = $p.html() ?? ''
          $p.replaceWith(`<dl><dt>${name}</dt><dd>${ddHtml}</dd></dl>`)
          return
        }

        if (!/^[^\x00-\x7F]+$/.test(elText)) return
        const second = nodes[1]
        if (!second || second.type !== 'text') return
        if (!colonPattern.test(second.data)) return
        second.data = second.data.replace(colonPattern, '')
        $(first).remove()
        const ddHtml = $p.html() ?? ''
        $p.replaceWith(`<dl><dt>${elText}</dt><dd>${ddHtml}</dd></dl>`)
      }
    })

    $('h2').each((_, el) => {
      const $h2 = $(el)
      const text = $h2.text()
      const i = text.indexOf('——')
      if (i < 0) return
      $h2.text(text.slice(0, i))
      $h2.append($('<small>').text(text.slice(i)))
    })

    const toc: InterviewTocItem[] = $('h2')
      .toArray()
      .map(el => ({
        id: el.attribs.id,
        text: buildTitle($(el).text()),
      }))

    const publicInterview: PublicInterview = {
      id: interview.id,
      createdAt: interview.createdAt,
      updatedAt: interview.updatedAt,
      publishedAt: interview.publishedAt,
      revisedAt: interview.revisedAt,
      guest: interview.guest,
      date: interview.date,
      title: interview.title,
      content: $.html(),
      member: interview.member,
    }

    const heading = buildTitle(publicInterview.title ?? publicInterview.guest)

    return <InterviewDetailView interview={publicInterview} toc={toc} heading={heading} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
