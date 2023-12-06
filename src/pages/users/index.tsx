import MainLayout from "~/layouts/main"

import toast from "react-hot-toast"
import Button from "~/components/Button"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "../_app"

const UsersPage: NextPageWithLayout = () => {
  const testSend = api.notification.testSend.useMutation({
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
            recipientId: "b9c9a596-ce65-4f20-a1b8-5c7ce94e8ab3",
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
