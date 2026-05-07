'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { AppFooter } from '@/components/layout/AppFooter'
import { ContentsMenu } from '@/components/ContentsMenu'
import styles from './Home.module.scss'
// import { WordUnit } from '@/components/WordUnit'

export const HomeView: FC = () => {
  return (
    <main className={styles.home} data-testid="home">
      <section className={styles.layout}>
        <div className={styles.hero}>
          <div className={styles.sticky}>
            <header className={styles.heroHeader}>
              <h1 className={styles.title}>Labが行く</h1>
              <span className={styles.kana}>lab ga iku</span>
            </header>
            <nav className={styles.nav}>
              <ContentsMenu className={styles.navList} />
            </nav>
          </div>
        </div>
        <div className={styles.body}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              「Labが行く」は、<span className={styles.highlight}>雑談をする</span>
              ための勉強会です。
              金曜日の夕方にオンラインで集まり、2時間しゃべったら「それじゃあ」と週末を迎えます。
            </p>
            <p className={styles.paragraph}>
              やらないことは、評価をすること。やることは、しっかり余談に集中すること。それは学校のホームルームに似ていて、関心事を共有し、リファレンスからはなれた世界を知る、&ldquo;授業じゃないけど意味はある&rdquo;1コマです。
            </p>
            <p className={styles.paragraph}>
              これまで、気になるゲストへインタビューをしてじっくり話を聞いたり、人と働く仕組みづくりを研究したり、AIエージェントへの愛着と愚痴をとことん語らったり、いにしへのインターネットについて思い出話をしたり、位相幾何学がいかに分からないか受け止めたり、ベトナム暮らしのふつうが想像以上にファンキーで驚いたり、いろいろな雑談をしてきました。
            </p>
            <p className={styles.paragraph}>
              成果に近い応用研究ではなく、知識そのものに近い基礎研究へ夢中になる体験、これは、緊急度が低いけれど重要度は高いことなのかもしれません。
              Labの時間は、すぐさま役に立つことのない
              <span className={styles.highlight}>buffer（アソビ）</span>であり、
              <span className={styles.highlight}>playfulness（遊び）</span>
              ですが、そうしたていねいな余白やノイズは &ldquo;無意味の意味&rdquo;
              にふと気づく時間にも思えます。
            </p>
            <p className={styles.paragraph}>
              ここでは、そんな「Labが行く」の一部を紹介しています。
            </p>
          </section>
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2 className={styles.articleTitle}>Labが聞く</h2>
              <small className={styles.articleKana}>interview</small>
            </header>
            <div className={styles.articleBody}>
              <p className={styles.paragraph}>
                人の話をしっかり聞く、それがただただ深い。
                考えていることや感じていること、そこには生き方や人となりが息づいています。形式知にはおさまらないソフトスキルの学びへようこそ。
              </p>
            </div>
            <footer className={styles.articleFooter}>
              <Link className={styles.moreLink} href="/interview">
                詳しく見る
              </Link>
            </footer>
          </article>
          {/* <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2 className={styles.articleTitle}>
                <WordUnit>人と働く仕組みは設計する</WordUnit>
              </h2>
              <small className={styles.articleKana}>ZINE</small>
            </header>
            <div className={styles.articleBody}>
              <p className={styles.paragraph}>コミットメントと成長は共存するのか？</p>
              <p className={styles.paragraph}>
                この本では、クリエイティブエージェンシー（いわゆる受託開発会社）のエンジニアチームで実践したチーム運営について解説しています。
              </p>
              <p className={styles.paragraph}>
                エンジニアに限らずクリエイター界隈では、成長環境とチーム運営の持続性は切り離して考えにくいテーマです。
              </p>
              <p className={styles.paragraph}>
                そして、ライフ・ワーク・バランスが目新しい言葉ではなくなっている昨今、「働く時間」の質をなおざりにしないマインドはクリエイターだけでなく全ての人が注目するテーマではないでしょうか。
              </p>
              <p className={styles.paragraph}>
                チームが順調と感じる瞬間、その背景にはLogic（仕組み）が存在しているはずです。そんなエンジニアならではの視点でマニアックに再現性を分析した「働く仕組みの設計」は、思いがけないヒントになるかもしれません。
              </p>
            </div>
            <footer className={styles.articleFooter}>
              <Link className={styles.moreLink} href="/zine">
                詳しく見る
              </Link>
            </footer>
          </article> */}
        </div>
      </section>
      <GlobalNavigation />
      <AppFooter className={styles.appFooter} session={null} />
    </main>
  )
}
