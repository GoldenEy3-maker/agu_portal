import { AppProps, type AppType } from "next/app"

import { api } from "~/utils/api"

import dayjs from "dayjs"
import "dayjs/locale/ru"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "~/styles/globals.sass"

dayjs.locale("ru")

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SkeletonTheme baseColor="hsl(var(--placeholder-hsl))">
      {getLayout(<Component {...pageProps} />)}
      <Toaster position="top-center" />
    </SkeletonTheme>
  )
}

export default api.withTRPC(MyApp)
