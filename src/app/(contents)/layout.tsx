import { getServerSession } from 'next-auth'
import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { AppFooter } from '@/components/layout/AppFooter'
import { authOptions } from '@/lib/auth'
import styles from './_parts/layout.module.scss'

export default async function ContentsLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <>
      <main className={styles.main}>{children}</main>
      <GlobalNavigation />
      <AppFooter session={session} />
    </>
  )
}
