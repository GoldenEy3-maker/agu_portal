import MainLayout from "~/layouts/Main"
import { NextPageWithLayout } from "../_app"

const SupportPage: NextPageWithLayout = () => {
  return <main>Страница поддержки</main>
}

SupportPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SupportPage
