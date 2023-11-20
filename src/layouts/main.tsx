import { Inter } from "next/font/google"
import Head from "next/head"
import { PropsWithChildren } from "react"
import ModalContainer from "~/components/#layouts/main/ModalContaier"
import Footer from "~/components/Footer"
import Header from "~/components/Header"
import Sidebar from "~/components/Sidebar"

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
      <div className={inter.className}>
        <div className="wrapper">
          <Header />
          <Sidebar />
          {props.children}
        </div>
        <Footer />
        <ModalContainer />
      </div>
    </>
  )
}

export default MainLayout
