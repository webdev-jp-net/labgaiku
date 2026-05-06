import { loadDefaultJapaneseParser } from 'budoux'
import styles from './WordUnit.module.scss'

const parser = loadDefaultJapaneseParser()

type Props = {
  children: string
}

export const WordUnit = ({ children }: Props) => (
  <>
    {parser.parse(children).map((segment, i) => (
      <span key={i} className={styles.word}>
        {segment}
      </span>
    ))}
  </>
)
