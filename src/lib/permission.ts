import type { Session } from 'next-auth'
import type { Interview } from '@/lib/api/microcms'

export const MASK_PLACEHOLDER = '*****'

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
