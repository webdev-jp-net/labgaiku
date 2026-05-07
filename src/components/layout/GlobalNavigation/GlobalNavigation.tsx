'use client'

import { useId, useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
import { ArrowUp, List, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IndexNavigation } from '@/app/(contents)/interview/[slug]/_parts/components/IndexNavigation'
import { indexNavigationAtom } from '@/data/store'
import styles from './GlobalNavigation.module.scss'

interface GlobalNavigationProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function GlobalNavigation({ className, ...props }: GlobalNavigationProps) {
  const indexNavigationList = useAtomValue(indexNavigationAtom)
  const uid = useId()
  const anchorName = `--global-navigation-index-${uid.replace(/:/g, '')}`
  const popoverId = `global-navigation-index-${uid.replace(/:/g, '')}`
  const popoverRef = useRef<HTMLDivElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const pathname = usePathname()
  const isOnInterviewDetail = /^\/interview\/[^/]+\/?$/.test(pathname)

  const handleToggle = () => {
    setIsPopoverOpen(popoverRef.current?.matches(':popover-open') ?? false)
  }

  return (
    <nav className={`${styles.globalNavigation} ${className ?? ''}`} {...props}>
      <div className={styles.header}>
        <Link href="/" className={styles.siteName}>
          Labが行く
        </Link>
        {isOnInterviewDetail && (
          <div className={styles.category}>
            {' '}
            <Link href="/interview" className={styles.categoryLink}>
              Labが聞く
            </Link>
          </div>
        )}
      </div>
      <div className={styles.menu}>
        {indexNavigationList.length > 0 && (
          <>
            <button
              type="button"
              className={styles.indexTrigger}
              popoverTarget={popoverId}
              style={{ anchorName } as React.CSSProperties}
              aria-label="index"
            >
              {isPopoverOpen ? <X strokeWidth={1.5} /> : <List strokeWidth={1.5} />}
            </button>
            <div
              ref={popoverRef}
              id={popoverId}
              popover="auto"
              className={styles.indexPopover}
              style={{ positionAnchor: anchorName } as React.CSSProperties}
              onToggle={handleToggle}
              onClick={e => {
                if ((e.target as HTMLElement).closest('a')) popoverRef.current?.hidePopover()
              }}
            >
              <IndexNavigation indexNavigationList={indexNavigationList} />
            </div>
          </>
        )}
        <button
          type="button"
          className={styles.scrollToTopTrigger}
          onClick={() => window.scrollTo(0, 0)}
          aria-label="先頭へ"
        >
          <ArrowUp strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  )
}
