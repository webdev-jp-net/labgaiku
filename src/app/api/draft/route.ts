import { timingSafeEqual } from 'node:crypto'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getInterviewById } from '@/lib/api/microcms'

/**
 * microCMS画面プレビューの起点。検証後に下書き表示を有効化して対象ページへ送る。
 * @param request - 認証トークン・記事ID・下書きキーをクエリに含むリクエスト
 * @returns 検証失敗時は編集者向け日本語エラーのResponse、成功時は対象記事ページへのリダイレクト
 */
export async function GET(request: Request) {
  const expectedSecret = process.env.MICROCMS_PREVIEW_SECRET
  if (!expectedSecret) {
    console.error('MICROCMS_PREVIEW_SECRET is not set')
    return new Response(
      'プレビューを起動できませんでした。サーバー管理者にお問い合わせください。',
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret') ?? ''
  const slug = searchParams.get('slug')
  const draftKey = searchParams.get('draftKey')

  const secretBuf = Buffer.from(secret)
  const expectedBuf = Buffer.from(expectedSecret)
  if (secretBuf.length !== expectedBuf.length || !timingSafeEqual(secretBuf, expectedBuf)) {
    return new Response(
      'プレビューを開始できませんでした。microCMS管理画面の画面プレビュー設定をご確認ください。',
      { status: 401 }
    )
  }

  if (!slug || !draftKey) {
    return new Response(
      'プレビューを開始できませんでした。URLにslugまたはdraftKeyが含まれていません。microCMS管理画面の画面プレビュー設定をご確認ください。',
      { status: 400 }
    )
  }

  try {
    await getInterviewById(slug, { draftKey, fields: 'id' })
  } catch (error) {
    console.error('Failed to fetch microCMS draft', error)
    return new Response(
      'プレビュー対象のインタビューを取得できませんでした。下書きの状態とURLパラメータをご確認ください。',
      { status: 401 }
    )
  }

  const draft = await draftMode()
  draft.enable()

  redirect(`/interview/${slug}?draftKey=${encodeURIComponent(draftKey)}`)
}
