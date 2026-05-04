import { createClient } from 'microcms-js-sdk'
import type { MicroCMSQueries } from 'microcms-js-sdk'

export type InterviewVisibility = 'secret' | 'limited' | 'public'

export type Interview = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  visibility: InterviewVisibility[]
  guest: string
  date?: string
  title?: string
  content?: string
  allowList?: string
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

if (!serviceDomain) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is not set')
}

if (!apiKey) {
  throw new Error('MICROCMS_API_KEY is not set')
}

export const client = createClient({
  serviceDomain,
  apiKey,
})

export const getInterviewList = async (queries?: MicroCMSQueries): Promise<Interview[]> => {
  const response = await client.getList<Interview>({ endpoint: 'interview', queries })
  return response.contents
}

export const getInterviewById = async (id: string, queries?: MicroCMSQueries) =>
  client.get<Interview>({ endpoint: 'interview', contentId: id, queries })
