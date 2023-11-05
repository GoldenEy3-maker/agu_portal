import { Inter } from "next/font/google"
import Head from "next/head"
import { PropsWithChildren } from "react"
import ModalContainer from "~/components/#layouts/main/ModalContaier"
import Footer from "~/components/Footer"
import Header from "~/components/Header"
import Sidebar from "~/components/Sidebar"
import { cls } from "~/utils/func"

const inter = Inter({ subsets: ["cyrillic", "latin"] })

type MainLayoutProps = {
  title?: string
  sidebarChildren?: React.ReactNode
} & PropsWithChildren

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title ?? "Цифровой университет АлтГУ"}</title>
        <meta name="description" content="Цифровой универстите АлтГУ" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className={cls("wrapper", inter.className)}>
        <Header />
        <div className="horizontal-wrapper">
          <Sidebar />
          <div className="main">
            <div className="main__wrapper container">{props.children}</div>
          </div>
        </div>
        <Footer />
        <ModalContainer />
      </div>
    </>
  )
}

export default MainLayout
