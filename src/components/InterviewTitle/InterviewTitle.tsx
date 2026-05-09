import type { FC } from 'react'
import { WordUnit } from '@/components/WordUnit'

type InterviewTitleProps = {
  /** タイトル文字列。`——` を境にサブタイトルへ分けられる */
  children: string
}

/**
 * インタビュータイトルの表示部品。
 * @param props.children - タイトル文字列。`——` 以降は控えめな見た目のサブタイトルになる
 * @returns 文節単位で折り返せるタイトル要素
 */
export const InterviewTitle: FC<InterviewTitleProps> = ({ children }) => {
  const i = children.indexOf('——')
  if (i < 0) return <WordUnit>{children}</WordUnit>
  return (
    <>
      <WordUnit>{children.slice(0, i)}</WordUnit>
      <small>
        <WordUnit>{children.slice(i)}</WordUnit>
      </small>
    </>
  )
}
