import type { Session } from 'next-auth'
import type { Interview, InterviewVisibility } from '@/lib/api/microcms'

export const MASK_PLACEHOLDER = '＊＊＊＊＊'

export type VisibilityLabel = {
  label: 'secret' | 'limited'
  ariaLabel: string
}

export const getVisibilityLabel = (visibility: InterviewVisibility[]): VisibilityLabel | null => {
  if (visibility.includes('secret')) return { label: 'secret', ariaLabel: '公開範囲: 非公開' }
  if (visibility.includes('limited')) return { label: 'limited', ariaLabel: '公開範囲: 限定公開' }
  return null
}

const parseAllowList = (text: string | undefined): string[] =>
  (text ?? '')
    .split(/\r?\n/)
    .map(line => line.trim().toLowerCase())
    .filter(Boolean)

export const canViewInterview = (interview: Interview, session: Session | null): boolean => {
  if (interview.visibility.includes('public')) return true
  if (!interview.visibility.includes('limited') && !interview.visibility.includes('secret')) {
    return false
  }

  const email = session?.user?.email?.toLowerCase()
  if (!email) return false

  const domain = email.split('@')[1] ?? ''
  const entries = parseAllowList(interview.allowList)

  return entries.some(entry => (entry.includes('@') ? entry === email : entry === domain))
}
