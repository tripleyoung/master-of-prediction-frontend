

import type { Metadata, Viewport } from "next";
import Head from "next/head";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import {  ToastProvider } from "@/components/ui/toast";
import Script from "next/script";
import GoogleAdsense from "@ui/GoogleAdsense";
import ClientWrapper from "@ui/ClientWrapper";
const APP_NAME = "예측의 달인";
  const APP_DEFAULT_TITLE = "예측의 달인";
  const APP_TITLE_TEMPLATE = "%s ";
  const APP_DESCRIPTION = "예측의 달인";
  
  export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_DEFAULT_TITLE,
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
    twitter: {
      card: "summary",
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
  };
  
export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};
  export async function generateStaticParams() {
    unstable_setRequestLocale('ko'); // 기본 로케일을 설정하세요.
    return []; // 추가적인 정적 매개변수가 있으면 반환하세요.
  }
  
export default async  function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
  }) {
 const { locale } = await params;
  
  const messages = await getMessages({locale});
  return (
    <>
      <html suppressContentEditableWarning>
        <body suppressHydrationWarning>
          <Head>
            <Script type="text/javascript" src="/service-worker-register.js" />
            <GoogleAdsense pId="2358632947348636" />
          </Head>
          <NextIntlClientProvider messages={messages}>
            <ToastProvider />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
