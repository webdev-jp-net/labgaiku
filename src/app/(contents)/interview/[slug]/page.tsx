import { loadDefaultJapaneseParser } from 'budoux'
import * as cheerio from 'cheerio'
import { getServerSession } from 'next-auth'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getInterviewById } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { formatJaDate } from '@/lib/date'
import { canViewInterview, getVisibilityLabel, MASK_PLACEHOLDER } from '@/lib/permission'
import { sanitizeHtml } from '@/lib/sanitize'
import wordStyles from '@/components/WordUnit/WordUnit.module.scss'
import { InterviewTitle } from '@/components/InterviewTitle'
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

type InterviewDetailPageProps = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    draftKey?: string
  }>
}

export default async function InterviewDetailPage({
  params,
  searchParams,
}: InterviewDetailPageProps) {
  const session = await getServerSession(authOptions)
  const { slug } = await params
  const { draftKey } = await searchParams

  const { isEnabled: isDraft } = await draftMode()
  const previewDraftKey = isDraft && draftKey ? draftKey : undefined

  try {
    const interview = await getInterviewById(
      slug,
      previewDraftKey ? { draftKey: previewDraftKey } : undefined
    )
    if (!previewDraftKey && !canViewInterview(interview, session)) {
      const callbackUrl = `/interview/${slug}`
      const isSecret = interview.visibility.includes('secret')
      return (
        <LoginPrompt
          callbackUrl={callbackUrl}
          heading={
            isSecret ? (
              MASK_PLACEHOLDER
            ) : (
              <InterviewTitle>{interview.title ?? interview.guest}</InterviewTitle>
            )
          }
          guest={MASK_PLACEHOLDER}
          dateTime={isSecret ? undefined : interview.date}
          formattedDate={
            isSecret ? MASK_PLACEHOLDER : interview.date ? formatJaDate(interview.date) : null
          }
          visibility={getVisibilityLabel(interview.visibility)}
        />
      )
    }
    const namePattern = /^([^\p{ASCII}]+?)[:：](.*)$/su
    const colonPattern = /^[:：]\s*/
    const processInterviewHtml = (html: string) => {
      const $ = cheerio.load(html)
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
          const elInnerMatch = elText.match(/^([^\p{ASCII}]+?)[:：]\s*$/u)
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

          if (!/^[^\p{ASCII}]+$/u.test(elText)) return
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

      return $
    }

    const $introduction = interview.introduction
      ? processInterviewHtml(interview.introduction)
      : null
    const $content = processInterviewHtml(interview.content ?? '')

    const indexNavigationList: IndexNavigationItem[] = $content('h2')
      .toArray()
      .map(el => ({
        id: el.attribs.id,
        text: <InterviewTitle>{$content(el).text()}</InterviewTitle>,
      }))

    const memberList = (interview.member ?? []).map(m => ({
      name: m.name,
      roll: m.roll,
      tagList: [...(m.isGuest ? ['ゲスト'] : []), ...(m.isFacilitator ? ['ファシリテーター'] : [])],
    }))

    const heading = <InterviewTitle>{interview.title ?? interview.guest}</InterviewTitle>

    return (
      <InterviewDetailView
        heading={heading}
        guest={interview.guest}
        dateTime={interview.date}
        formattedDate={interview.date ? formatJaDate(interview.date) : null}
        sanitizedIntroduction={$introduction ? sanitizeHtml($introduction.html()) : undefined}
        sanitizedContent={sanitizeHtml($content.html())}
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
