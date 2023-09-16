import MainLayout from "~/layouts/main"
import { NextPageWithLayout } from "../_app"

const SettingsPage: NextPageWithLayout = () => {
  return <main>Страница настроек</main>
}

SettingsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SettingsPage
