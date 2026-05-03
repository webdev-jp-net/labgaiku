import type { Session } from 'next-auth'
import type { Report } from '@/lib/api/microcms'

export const MASK_PLACEHOLDER = '*****'

const parseAllowList = (text: string | undefined): string[] =>
  (text ?? '')
    .split(/\r?\n/)
    .map(line => line.trim().toLowerCase())
    .filter(Boolean)

export const canViewReport = (report: Report, session: Session | null): boolean => {
  if (report.visibility.includes('public')) return true
  if (!report.visibility.includes('limited') && !report.visibility.includes('secret')) {
    return false
  }

  const email = session?.user?.email?.toLowerCase()
  if (!email) return false

  const domain = email.split('@')[1] ?? ''
  const entries = parseAllowList(report.allowList)

  return entries.some(entry =>
    entry.includes('@') ? entry === email : entry === domain
  )
}
