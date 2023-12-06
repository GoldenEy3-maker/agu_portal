import dayjs from "dayjs"
import NextLink from "next/link"
import { useState } from "react"
import Button from "~/components/Button"
import {
  IconBell,
  IconCheckDouble,
  IconCog,
  IconSolidAlarm,
  IconTrash,
} from "~/components/Icons"
import Link from "~/components/Link"
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
    api.notification.getAllBySession.useQuery()

  api.notification.onSend.useSubscription(sessionStore.user?.id, {
    onData(data) {
      console.log("🚀 ~ file: index.tsx:37 ~ onData ~ data:", data)
      getNotificationsBySessionQuery.refetch()
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:41 ~ onError ~ error:", error)
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
            <Button type="button" asIcon title="Пометить все, как прочитанное">
              <IconCheckDouble />
            </Button>
            <Button
              asIcon
              type="button"
              color="danger"
              title="Удалить все"
              onClick={() =>
                modalStore.open({ key: ModalKeyMap.DeleteNotifications })
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
                {getNotificationsBySessionQuery.data?.map((notification) => (
                  <li key={notification.id}>
                    <NextLink
                      href={PagePathMap.HomePage}
                      onPointerDown={rippleEffectEvent}
                      className={cls(styles.item, {
                        [styles._notReaded ?? ""]: !notification.isReaded,
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
                          dateTime={dayjs(notification.createdAt).toISOString()}
                        >
                          {dayjs().to(dayjs(notification.createdAt))}
                        </time>
                        <i></i>
                        <span>Менеджмент в профессиональной деятельности</span>
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
