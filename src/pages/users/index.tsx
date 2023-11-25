import toast from "react-hot-toast"
import Button from "~/components/Button"
import MainLayout from "~/layouts/main"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "../_app"

const UsersPage: NextPageWithLayout = () => {
  const notificationTestSend = api.notification.testSend.useMutation({
    onSuccess() {
      toast.success("Уведомление успешно отправлено!")
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:13 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })
  return (
    <main className="content-grid">
      <h1>Страница пользователей</h1>
      <Button
        type="button"
        variant="filled"
        disabled={notificationTestSend.isLoading}
        onClick={() =>
          notificationTestSend.mutate({
            recipientId: "b9c9a596-ce65-4f20-a1b8-5c7ce94e8ab3",
            link: "",
            subjet: "",
          })
        }
      >
        Отправить уведомление
      </Button>
    </main>
  )
}

UsersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default UsersPage
