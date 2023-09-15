import Button from "~/components/Button"
import MainLayout from "~/layouts/main"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" })

  return (
    <>
      <main>Главная страница</main>
    </>
  )
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
