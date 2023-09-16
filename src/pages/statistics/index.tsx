import MainLayout from "~/layouts/main"
import { NextPageWithLayout } from "../_app"

const StatisticsPage: NextPageWithLayout = () => {
  return <main>Страница статистики</main>
}

StatisticsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default StatisticsPage
