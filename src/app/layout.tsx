import type { Metadata } from "next";
import { SessionWrapper } from "@/components/auth/SessionWrapper";
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
          <div id="root">{children}</div>
        </SessionWrapper>
      </body>
    </html>
  );
}

