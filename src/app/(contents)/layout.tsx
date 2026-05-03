import { AppHeader } from '@/components/layout/AppHeader'

export default function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  )
}
