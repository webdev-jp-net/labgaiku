'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import styles from './page.module.scss'

export const HomeView: FC = () => {
  return (
    <main className={styles.home} data-testid="home">
      <div className={styles.hero}>
        <h1 className={styles.title}>Labが行く</h1>
        <span className={styles.kana}>LAB GA IKU</span>
        <nav className={styles.nav}>
          <Link className={styles.link} href="/interview">
            インタビュー
          </Link>
        </nav>
      </div>
      <AppHeader className={styles.appHeader} />
      <section className={styles.section}>
        <p className={styles.paragraph}>
          「Labが行く」は、金曜日の夕方にオンライン開催している集まりです。
          <br />
          週のおわりに集まって、探求や学びを深める基礎研究のようなことを思いっきり雑談しています。
        </p>
        <p className={styles.paragraph}>
          それは、 あそびで、アソビ（buffer）で、遊び（play）なんですが、
          <br />
          なんの利益や成果も考えていないのに、集中しておもしろいことを語らうと、知らぬ間に学びが深まっていたりします。
        </p>
        <p className={styles.paragraph}>
          あえて、応用研究ではなく基礎研究へ一生懸命になるのは、実は、緊急度が低いけれど重要度は高いことなのかもしれません。
        </p>
        <p className={styles.paragraph}>
          これまでには、気になるゲストへのインタビューでじっくり話を聞いてみたり、チームダイナミクスを研究し働く体験を設計することを考えてみたりしています。
        </p>
        <p className={styles.paragraph}>ここでは、その一部を読めるようにしてみました。</p>
      </section>
    </main>
  )
}
