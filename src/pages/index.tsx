import Welcome from "~/components/#pages/home/Welcome"
import MainLayout from "~/layouts/main"
import { NextPageWithLayout } from "./_app"
import styles from "./styles.module.scss"

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <main className={styles.main}>
        <Welcome />
      </main>
    </>
  )
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
