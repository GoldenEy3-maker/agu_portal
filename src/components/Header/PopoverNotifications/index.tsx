import dayjs from "dayjs"
import NextLink from "next/link"
import Pusher from "pusher-js"
import { useEffect, useState } from "react"
import Button from "~/components/Button"
import {
  IconBell,
  IconCheckDouble,
  IconCog,
  IconSolidAlarm,
} from "~/components/Icons"
import Link from "~/components/Link"
import * as Popover from "~/components/Popover"
import UserAvatar from "~/components/UserAvatar"
import { env } from "~/env.mjs"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { PagePathMap, PusherEventMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import {
  useChannelSubscribe,
  usePresenceChannelSubscribe,
} from "~/utils/pusher"
import LoadingSkeleton from "./LoadingSkeleton"
import styles from "./styles.module.sass"

const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  forceTLS: true,
})

const PopoverNotifications: React.FC = () => {
  const sessionStore = useSessionStore()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const rippleEffectEvent = useRippleEffect()

  const closePopoverHandler = () => setIsPopoverOpen(false)

  const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState)

  const getNotificationsBySessionQuery =
    api.notification.getAllBySession.useQuery()

  usePresenceChannelSubscribe(
    `user-${sessionStore.user?.id}`,
    "send-notification",
    (data) => {
      console.log("🚀 ~ file: index.tsx:40 ~ useChannelSubscribe ~ data:", data)
      getNotificationsBySessionQuery.refetch()
    }
  )

  // useEffect(() => {
  //   pusherClient.connect()

  //   const channel = pusherClient.subscribe(`user-${sessionStore.user?.id}`)
  //   console.log("🚀 ~ file: index.tsx:57 ~ useEffect ~ channel:", channel)
  //   channel.bind(PusherEventMap.SendNotification, (data: unknown) => {
  //     console.log("🚀 ~ file: index.tsx:58 ~ channel.bind ~ data:", data)
  //     getNotificationsBySessionQuery.refetch()
  //   })

  //   return () => {
  //     console.log("disconnected")
  //     pusherClient.disconnect()
  //   }
  // }, [])

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
            <Link
              href={PagePathMap.SettingsPage}
              asIcon
              title="Настройки уведомлений"
            >
              <IconCog />
            </Link>
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
                        <time dateTime={notification.createdAt.toISOString()}>
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
