'use client'

import Link from 'next/link'
import type { FC } from 'react'

import styles from './page.module.scss'

export const HomeView: FC = () => {
  return (
    <section className={styles.home} data-testid="home">
      <Link href="/interview">インタビュー</Link>
    </section>
  )
}
