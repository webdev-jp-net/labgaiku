"use client";

import type { Session } from "next-auth";
import Link from "next/link";
import styles from "./page.module.scss";
import { useHome } from "./useHome";

type HomeViewProps = {
  session: Session | null;
};

export function HomeView({ session }: HomeViewProps) {
  const { links } = useHome({ session });

  return (
    <section className={styles.home} data-testid="home">
      <h1 className={styles.title}>Labが行く</h1>
      <nav className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

