import MainLayout from "~/layouts/main"
import { NextPageWithLayout } from "../_app"

const UsersPage: NextPageWithLayout = () => {
  return <main>Страница пользователей</main>
}

UsersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default UsersPage
