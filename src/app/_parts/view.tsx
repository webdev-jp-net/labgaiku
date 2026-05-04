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
        <p className={styles.paragraph}>「Labが行く」は、雑談をするための勉強会です。</p>
        <p className={styles.paragraph}>
          金曜日の夕方にオンラインで集まり、2時間しゃべってから「それじゃあ」と週末を迎えます。
          やらないことは、仕事。やることは、しっかり余談に集中すること。それはホームルームに似ていて、関心事を共有し、人間を考え、リファレンスとは別の学びを深める、&ldquo;授業じゃないけど意味のある&rdquo;1コマです。
        </p>
        <p className={styles.paragraph}>
          これまで、気になるゲストへインタビューをしてじっくり話を聞いたり、人と働く仕組みづくりを研究したり、AIエージェントへの愛や愚痴をとことん語らったり、いにしへのインターネットについて思い出話をしたり、位相幾何学がいかに分からないか受け止めたり、いろいろな雑談をしてきました。
        </p>
        <p className={styles.paragraph}>
          成果に近い応用研究ではなく、知識そのものに近い基礎研究へ夢中になる体験、これは、緊急度が低いけれど重要度は高いことなのかもしれません。
          Labは、すぐさま役に立つことのないbuffer（アソビ）でplay（遊び）の時間なのですが、そうしたていねいな余白やノイズは&ldquo;無意味の意味&rdquo;にふと気づく時間でもあるよう思えてしかたがないのです。
        </p>
        <p className={styles.paragraph}>ここでは、そんな「Labが行く」の一部をご紹介しています。</p>
      </section>
    </main>
  )
}
