import type { FC } from 'react'
import { WordUnit } from '@/components/WordUnit'
import styles from './Zine.module.scss'

import coverImage from './images/cover.webp'

export const ZineView: FC = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div className={styles.sticky}>
          <h1 className={styles.title}>
            <WordUnit>人と働く仕組みは設計する</WordUnit>
          </h1>
          <small className={styles.kana}>ZINE</small>
          <p className={styles.description}>
            チームビルディングの取り組みについて、リソグラフという孔版印刷でちいさな冊子をつくりました。
          </p>
          <p className={styles.description}>同じ内容を、ZennのBookでも公開しています。</p>
          <p className={styles.description}>
            <a
              href="https://zenn.dev/webdev/books/collaboration-architecture"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zenn Book : 人と働く仕組みは設計する
            </a>
          </p>
        </div>
      </header>
      <div className={styles.body}>
        <figure className={styles.figure}>
          <img className={styles.image} src={coverImage.src} alt="カバー画像" />
        </figure>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <h2 className={styles.headline}>
              <WordUnit>コミットメントと成長は共存するのか？</WordUnit>
            </h2>
          </header>
          <div className={styles.articleBody}>
            <p className={styles.paragraph}>
              この本では、クリエイティブエージェンシー（いわゆる受託開発会社）のエンジニアチームで実践したチーム運営について解説しています。
            </p>
            <p className={styles.paragraph}>
              エンジニアに限らずクリエイター界隈では、
              <span className={styles.highlight}>
                成長環境とチーム運営の持続性は切り離して考えにくい
              </span>
              テーマです。
              <br />
              そして、ワークライフバランスが目新しい言葉ではなくなっている昨今、
              <span className={styles.highlight}>「働く時間」の質</span>
              をなおざりにしないマインドはクリエイターだけでなく全ての人が注目するテーマではないでしょうか。
            </p>
            <p className={styles.paragraph}>
              チームが順調と感じる瞬間、その背景にはLogic（仕組み）が存在しているはずです。そんな、
              <span className={styles.highlight}>
                エンジニアならではの視点でマニアックに再現性を分析した「働く仕組みの設計」
              </span>
              は、思いがけないヒントになるかもしれません。
            </p>
            <p className={styles.paragraph}>
              <a
                href="https://zenn.dev/webdev/books/collaboration-architecture"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zenn Book : 人と働く仕組みは設計する
              </a>
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
