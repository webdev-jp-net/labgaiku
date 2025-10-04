import type { Metadata } from "next";
import { SessionWrapper } from "@/components/auth/SessionWrapper";
import { AppHeader } from "@/components/layout/AppHeader";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "Labが行く",
  description: "TAMSAN Labのレポート管理システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <SessionWrapper>
          <div id="root">
            <AppHeader />
            <main>{children}</main>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}

