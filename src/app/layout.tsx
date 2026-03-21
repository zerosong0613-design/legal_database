import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "법무 문서 데이터베이스",
  description: "사내 법무 문서 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
