import { AppHeader } from '@/components/layout/AppHeader'
// import { AppFooter } from '@/components/layout/AppFooter'

export default function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      {/* <AppFooter /> */}
    </>
  )
}
