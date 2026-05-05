import { getServerSession } from 'next-auth'
import { AppHeader } from '@/components/layout/AppHeader'
import { AppFooter } from '@/components/layout/AppFooter'
import { authOptions } from '@/lib/auth'

export default async function ContentsLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <>
      <AppHeader session={session} />
      <main>{children}</main>
      <AppFooter session={session} />
    </>
  )
}
