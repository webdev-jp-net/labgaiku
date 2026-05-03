import { getServerSession } from 'next-auth'
import { getReportList } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewReport, MASK_PLACEHOLDER } from '@/lib/permissions'
import { HomeView } from './_parts/view'
import type { ReportListItem } from './_parts/view'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  try {
    const reportList = await getReportList()
    const itemList: ReportListItem[] = reportList
      .filter(report => {
        if (report.visibility.includes('secret')) {
          return canViewReport(report, session)
        }
        return true
      })
      .map(report => {
        const canView = canViewReport(report, session)
        return {
          id: report.id,
          title: canView ? report.title : MASK_PLACEHOLDER,
          guest: canView ? report.guest : MASK_PLACEHOLDER,
          canView,
        }
      })
    return <HomeView session={session} itemList={itemList} />
  } catch {
    return <HomeView session={session} itemList={[]} />
  }
}
