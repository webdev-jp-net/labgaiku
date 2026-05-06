import { loadDefaultJapaneseParser } from 'budoux'
import * as cheerio from 'cheerio'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { getInterviewById } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { formatJaDate } from '@/lib/date'
import { canViewInterview, getVisibilityLabel } from '@/lib/permission'
import { sanitizeHtml } from '@/lib/sanitize'
import { WordUnit } from '@/components/WordUnit'
import wordStyles from '@/components/WordUnit/WordUnit.module.scss'
import { LoginPrompt } from './_parts/components/LoginPrompt'
import { InterviewDetailView } from './_parts/view'
import type { IndexNavigationItem } from './_parts/components/IndexNavigation/IndexNavigation'

const parser = loadDefaultJapaneseParser()

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const segmentToHtml = (text: string) =>
  parser
    .parse(text)
    .map(s => `<span class="${wordStyles.word}">${escapeHtml(s)}</span>`)
    .join('')

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
      if (i < 0) {
        $h2.html(segmentToHtml(text))
        return
      }
      $h2.html(`${segmentToHtml(text.slice(0, i))}<small>${segmentToHtml(text.slice(i))}</small>`)
    })

    $('h3').each((_, el) => {
      const $h3 = $(el)
      $h3.html(segmentToHtml($h3.text()))
    })

    const indexNavigationList: IndexNavigationItem[] = $('h2')
      .toArray()
      .map(el => ({
        id: el.attribs.id,
        text: buildTitle($(el).text()),
      }))

    const memberList = (interview.member ?? []).map(m => ({
      name: m.name,
      roll: m.roll,
      tagList: [...(m.isGuest ? ['ゲスト'] : []), ...(m.isFacilitator ? ['ファシリテーター'] : [])],
    }))

    const heading = buildTitle(interview.title ?? interview.guest)

    return (
      <InterviewDetailView
        heading={heading}
        guest={interview.guest}
        dateTime={interview.date}
        formattedDate={interview.date ? formatJaDate(interview.date) : null}
        sanitizedContent={sanitizeHtml($.html())}
        indexNavigationList={indexNavigationList}
        memberList={memberList}
        visibility={getVisibilityLabel(interview.visibility)}
      />
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
