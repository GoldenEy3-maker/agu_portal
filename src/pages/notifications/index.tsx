import React from "react"
import MainLayout from "~/layouts/main"
import { NextPageWithLayout } from "../_app"

const NotificationsPage: NextPageWithLayout = () => {
  return <main>Страница уведомлений</main>
}

NotificationsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default NotificationsPage
