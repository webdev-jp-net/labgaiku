import { getServerSession } from 'next-auth'
import { getInterviewList } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewInterview, MASK_PLACEHOLDER } from '@/lib/permission'
import { InterviewIndexView } from './_parts/view'
import type { InterviewListItem } from './_parts/view'

export default async function InterviewIndexPage() {
  const session = await getServerSession(authOptions)

  try {
    const interviewList = await getInterviewList()
    const itemList: InterviewListItem[] = interviewList
      .filter(interview => {
        if (interview.visibility.includes('secret')) {
          return canViewInterview(interview, session)
        }
        return true
      })
      .map(interview => {
        const canView = canViewInterview(interview, session)
        return {
          id: interview.id,
          title: canView ? interview.title : MASK_PLACEHOLDER,
          guest: canView ? interview.guest : MASK_PLACEHOLDER,
          date: interview.date,
          canView,
        }
      })
    return <InterviewIndexView session={session} itemList={itemList} />
  } catch {
    return <InterviewIndexView session={session} itemList={[]} />
  }
}
