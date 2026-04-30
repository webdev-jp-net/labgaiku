import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionWrapper } from "@/components/auth/SessionWrapper";
import { AppHeader } from "@/components/layout/AppHeader";
import "@/styles/index.scss";

const lineSeedJP = localFont({
  src: [
    { path: "./fonts/LINESeedJP_OTF_Th.woff2", weight: "100", style: "normal" },
    { path: "./fonts/LINESeedJP_OTF_Rg.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-line-seed-jp",
  display: "swap",
});

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
    <html lang="ja" className={lineSeedJP.variable}>
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
