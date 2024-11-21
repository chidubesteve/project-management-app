import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./DashboardWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectPulse",
  description:
    "ProjectPulse is an intuitive project management platform designed to streamline team collaboration and ensure seamless progress tracking. With features to monitor timelines, assign and manage tasks, and oversee team contributions, ProjectPulse keeps your projects beating to the rhythm of success. Powered by cutting-edge technologies like Next.js, Prisma, Node.js, and AWS, it delivers robust performance and scalability for teams of all sizes. Stay synchronized, meet deadlines, and achieve your goals—all with a single platform that puts your projects’ progress at the heart of your workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
