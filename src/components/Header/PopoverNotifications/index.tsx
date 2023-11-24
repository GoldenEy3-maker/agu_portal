import dayjs from "dayjs"
import NextLink from "next/link"
import { useState } from "react"
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
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { PagePathMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import LoadingSkeleton from "./LoadingSkeleton"
import styles from "./styles.module.sass"

const PopoverNotifications: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const sessionStore = useSessionStore()
  const rippleEffectEvent = useRippleEffect()

  const closePopoverHandler = () => setIsPopoverOpen(false)

  const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState)

  const getSessionQuery = api.auth.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
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
          {!getSessionQuery.isLoading ? (
            sessionStore.user?.receivedNotifications?.length ? (
              <ul className={styles.list}>
                {sessionStore.user.receivedNotifications.map((notification) => (
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
                        <time dateTime="2023-02-02">
                          {dayjs().to(dayjs("2023-11-22:14:00:00"))}
                        </time>
                        <i></i>
                        <span>Менеджмент в профессиональной деятельности</span>
                      </p>
                    </NextLink>
                  </li>
                ))}
                <li>
                  <NextLink
                    href={PagePathMap.HomePage}
                    onPointerDown={rippleEffectEvent}
                    className={styles.item}
                  >
                    <div className={styles.avatar}>
                      <UserAvatar />
                    </div>
                    <p className={styles.text}>
                      <strong>Виктория</strong>
                      &nbsp;оставил-(ла) отзыв на&nbsp;
                      <strong>Лабораторная работа №1</strong>
                    </p>
                    <p className={styles.extraInfo}>
                      <time dateTime="2023-02-02">
                        {dayjs().to(dayjs("2023-11-22:14:00:00"))}
                      </time>
                      <i></i>
                      <span>Менеджмент в профессиональной деятельности</span>
                    </p>
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    href={PagePathMap.HomePage}
                    onPointerDown={rippleEffectEvent}
                    className={styles.item}
                  >
                    <div className={styles.avatar}>
                      <UserAvatar />
                    </div>
                    <p className={styles.text}>
                      <strong>Виктория</strong>
                      &nbsp;оставил-(ла) отзыв на&nbsp;
                      <strong>Лабораторная работа №1</strong>
                    </p>
                    <p className={styles.extraInfo}>
                      <time dateTime="2023-02-02">
                        {dayjs().to(dayjs("2023-11-22:14:00:00"))}
                      </time>
                      <i></i>
                      <span>Менеджмент в профессиональной деятельности</span>
                    </p>
                  </NextLink>
                </li>
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
