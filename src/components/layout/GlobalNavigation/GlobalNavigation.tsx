'use client'

import { useId, useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
import { List, X } from 'lucide-react'
import Link from 'next/link'
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

  const handleToggle = () => {
    setIsPopoverOpen(popoverRef.current?.matches(':popover-open') ?? false)
  }

  return (
    <nav className={`${styles.globalNavigation} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
      <div className={styles.menu}>
        {indexNavigationList.length > 0 && (
          <>
            <button
              type="button"
              className={styles.indexTrigger}
              popoverTarget={popoverId}
              style={{ anchorName } as React.CSSProperties}
              aria-label="目次"
            >
              {isPopoverOpen ? <X /> : <List />}
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
      </div>
    </nav>
  )
}
