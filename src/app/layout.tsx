import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/index.scss'

const lineSeedJP = localFont({
  src: [
    { path: './_parts/font/LINESeedJP_OTF_Th.woff2', weight: '100', style: 'normal' },
    { path: './_parts/font/LINESeedJP_OTF_Rg.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-line-seed-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://labgaiku.org'),
  title: {
    default: 'Labが行く',
    template: '%s | Labが行く',
  },
  description: '「Labが行く」は、雑談をするための勉強会です。',
  openGraph: {
    title: 'Labが行く',
    description: '「Labが行く」は、雑談をするための勉強会です。',
    url: '/',
    siteName: 'Labが行く',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labが行く',
    description: '「Labが行く」は、雑談をするための勉強会です。',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={lineSeedJP.variable}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
