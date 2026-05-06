import { getServerSession } from 'next-auth'
import { getInterviewList } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewInterview, getVisibilityLabel, MASK_PLACEHOLDER } from '@/lib/permission'
import { WordUnit } from '@/components/WordUnit'
import { InterviewIndexView } from './_parts/view'
import type { InterviewListItem } from './_parts/view'

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

export default async function InterviewIndexPage() {
  const session = await getServerSession(authOptions)

  try {
    const interviewList = await getInterviewList({ orders: '-date' })
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
          title: canView ? buildTitle(interview.title ?? interview.guest) : MASK_PLACEHOLDER,
          guest: canView ? interview.guest : MASK_PLACEHOLDER,
          date: interview.date,
          canView,
          visibility: getVisibilityLabel(interview.visibility),
        }
      })
    return <InterviewIndexView itemList={itemList} />
  } catch {
    return <InterviewIndexView itemList={[]} />
  }
}
