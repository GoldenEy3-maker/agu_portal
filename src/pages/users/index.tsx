import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Section from "~/components/Section"
import MainLayout from "~/layouts/main"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "../_app"

const UsersPage: NextPageWithLayout = () => {
  const getUsers = api.user.getAll.useQuery()

  const testSend = api.notification.send.useMutation({
    onSuccess() {
      toast.success("Уведомление успешно отправлено!")
    },
    onError(err) {
      console.log("🚀 ~ file: index.tsx:16 ~ onError ~ err:", err)
      toast.error(err.message)
    },
  })
  return (
    <main className="content-grid">
      <Section.Root>
        <Section.Title>Страница пользователей</Section.Title>
        <Section.Content>
          <ul>
            {getUsers.data?.map((user) => (
              <li key={user.id}>
                <p>
                  {user.surname} {user.name} {user.patronymic}
                </p>
                <Button
                  type="button"
                  variant="filled"
                  onClick={() =>
                    testSend.mutate({
                      link: "/",
                      subject: "МЕНПД",
                      target: "Лабораторная работа №2",
                      recipientId: user.id,
                      type: "open-curse-element",
                    })
                  }
                >
                  Отправить
                </Button>
              </li>
            ))}
          </ul>
        </Section.Content>
      </Section.Root>
    </main>
  )
}

UsersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default UsersPage
