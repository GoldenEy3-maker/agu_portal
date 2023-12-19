import { useState } from "react"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Section from "~/components/Section"
import * as Tabs from "~/components/Tabs"
import MainLayout from "~/layouts/main"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "../_app"

const tableTestTabLabel = {
  testReview: "Отзывы",
  test: "Тесты",
  publish: "Публикация",
  tasks: "Задания",
  statistic: "Статистика",
}

const UsersPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof tableTestTabLabel>("testReview")

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
          <Tabs.Root name="test">
            <Tabs.Track labels={tableTestTabLabel}>
              {(key, label) => (
                <Tabs.Item
                  key={key}
                  id={key}
                  label={label}
                  isActive={activeTab === key}
                  onChange={() =>
                    setActiveTab(key as keyof typeof tableTestTabLabel)
                  }
                />
              )}
            </Tabs.Track>
          </Tabs.Root>
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
