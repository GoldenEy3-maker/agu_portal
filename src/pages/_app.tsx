import { AppProps, type AppType } from "next/app"

import { api } from "~/utils/api"

import * as dayjs from "dayjs"
import "dayjs/locale/ru"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import "~/styles/globals.scss"

dayjs.locale("ru")

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default api.withTRPC(MyApp)
