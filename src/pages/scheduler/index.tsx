import MainLayout from "~/layouts/Main"
import { NextPageWithLayout } from "../_app"

const SchedulerPage: NextPageWithLayout = () => {
  return <main>Страница расписания</main>
}

SchedulerPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SchedulerPage
