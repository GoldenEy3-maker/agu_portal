import MainLayout from "~/layouts/main"

import toast from "react-hot-toast"
import Button from "~/components/Button"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "../_app"

const UsersPage: NextPageWithLayout = () => {
  const testSend = api.notification.send.useMutation({
    onSuccess() {
      toast.success("Уведомление успешно отправлено!")
    },
    onError(error) {
      toast.error(error.message)
    },
  })
  return (
    <main className="content-grid">
      <h1>Страница пользователей</h1>
      <Button
        type="button"
        variant="filled"
        onClick={() =>
          testSend.mutate({
            link: "",
            subject: "",
            recipientId: "7a5b2e46-6bdd-46e5-9149-b35dfae50982",
          })
        }
      >
        Отправить
      </Button>
    </main>
  )
}

UsersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default UsersPage
