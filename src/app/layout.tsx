import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SessionWrapper } from '@/components/auth/SessionWrapper'
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
  title: 'Labが行く',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={lineSeedJP.variable}>
      <body>
        <SessionWrapper>
          <div id="root">{children}</div>
        </SessionWrapper>
      </body>
    </html>
  )
}
