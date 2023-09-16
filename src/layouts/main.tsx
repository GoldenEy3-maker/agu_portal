import { Inter } from "next/font/google"
import Head from "next/head"
import Sidebar from "~/components/Sidebar"
import { cls } from "~/utils/func"

const inter = Inter({ subsets: ["cyrillic", "latin"] })

const MainLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Head>
        <title>Цифровой университет АлтГУ</title>
        <meta name="description" content="Цифровой универстите АлтГУ" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className={cls(["wrapper", inter.className])}>
        <Sidebar />
        {props.children}
      </div>
    </>
  )
}

export default MainLayout