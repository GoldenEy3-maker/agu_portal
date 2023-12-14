import dayjs from "dayjs"
import NextLink from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import {
  IconBell,
  IconCheckSqure,
  IconSolidAlarm,
  IconTrash,
} from "~/components/Icons"
import LoadingIcon from "~/components/LoadingIcon"
import * as Popover from "~/components/Popover"
import UserAvatar from "~/components/UserAvatar"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap, PagePathMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import LoadingSkeleton from "./LoadingSkeleton"
import styles from "./styles.module.sass"

const PopoverNotifications: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const modalStore = useModalStore()
  const sessionStore = useSessionStore()
  const rippleEffectEvent = useRippleEffect()

  const closePopoverHandler = () => setIsPopoverOpen(false)

  const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState)

  const getNotificationsBySessionQuery =
    api.notification.getBySession.useQuery()

  api.notification.onSend.useSubscription(
    { userId: sessionStore.user?.id },
    {
      onData() {
        void getNotificationsBySessionQuery.refetch()
      },
      onError(err) {
        console.log("🚀 ~ file: index.tsx:41 ~ onError ~ err:", err)
      },
    }
  )

  const readAllNotifications = api.notification.readAll.useMutation({
    onSuccess() {
      toast.success("Все уведомления прочитаны.")
      void getNotificationsBySessionQuery.refetch()
    },
    onError(err) {
      console.log("🚀 ~ file: index.tsx:57 ~ onError ~ err:", err)
      toast.error(err.message)
    },
  })

  return (
    <Popover.Root closeHandler={closePopoverHandler}>
      <Popover.Trigger
        type="button"
        asIcon
        color="default"
        onClick={togglePopoverHandler}
        isActive={isPopoverOpen}
      >
        <IconBell />
      </Popover.Trigger>
      <Popover.Wrapper isOpen={isPopoverOpen}>
        <Popover.Header>
          <Popover.Title>Уведомления</Popover.Title>
          <Popover.Actions>
            <Button
              type="button"
              loading={readAllNotifications.isLoading}
              asIcon
              onClick={() => readAllNotifications.mutate()}
              title="Пометить все, как прочитанное"
              disabled={
                getNotificationsBySessionQuery.isLoading ||
                !getNotificationsBySessionQuery.data ||
                getNotificationsBySessionQuery.data.length === 0
              }
            >
              <IconCheckSqure />
            </Button>
            <Button
              asIcon
              type="button"
              color="danger"
              title="Удалить все"
              onClick={(event) =>
                modalStore.open({
                  key: ModalKeyMap.DeleteNotifications,
                  target: event.currentTarget,
                })
              }
              disabled={
                getNotificationsBySessionQuery.isLoading ||
                !getNotificationsBySessionQuery.data ||
                getNotificationsBySessionQuery.data.length === 0
              }
            >
              <IconTrash />
            </Button>
          </Popover.Actions>
        </Popover.Header>
        <Popover.Content className={styles.content}>
          {!getNotificationsBySessionQuery.isLoading ? (
            getNotificationsBySessionQuery.data?.length ? (
              <ul className={styles.list}>
                {getNotificationsBySessionQuery.data
                  ?.sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime()
                    const dateB = new Date(b.createdAt).getTime()

                    return dateB - dateA
                  })
                  .map((notification) => (
                    <li key={notification.id}>
                      <NextLink
                        href={PagePathMap.HomePage}
                        onPointerDown={rippleEffectEvent}
                        className={cls(styles.item, {
                          [styles._notReaded ?? ""]: !notification.isRead,
                        })}
                      >
                        <div className={styles.avatar}>
                          <UserAvatar src={notification.sender.avatar} />
                        </div>
                        <p className={styles.text}>
                          <strong>{notification.sender.name}</strong>
                          &nbsp;оставил-(ла) отзыв на&nbsp;
                          <strong>Лабораторная работа №1</strong>
                        </p>
                        <p className={styles.extraInfo}>
                          <time
                            dateTime={dayjs(
                              notification.createdAt
                            ).toISOString()}
                          >
                            {dayjs().to(dayjs(notification.createdAt))}
                          </time>
                          <i></i>
                          <span>
                            Менеджмент в профессиональной деятельности
                          </span>
                        </p>
                      </NextLink>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className={styles.empty}>
                <span>
                  <IconSolidAlarm />
                </span>
                <p>У вас пока нет уведомлений.</p>
                <p>Возвращайтесь позже.</p>
              </div>
            )
          ) : (
            <LoadingSkeleton />
          )}
        </Popover.Content>
      </Popover.Wrapper>
    </Popover.Root>
  )
}

export default PopoverNotifications
