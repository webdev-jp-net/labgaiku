import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * 下書きプレビュー表示を解除して一覧へ戻す。
 * @returns インタビュー一覧へのリダイレクト
 */
export async function GET() {
  const draft = await draftMode()
  draft.disable()

  redirect('/interview')
}
