import dayjs from 'dayjs'

export const formatJaDate = (value: string | undefined): string => {
  if (!value) return ''
  return dayjs(value).format('YYYY年M月D日')
}
