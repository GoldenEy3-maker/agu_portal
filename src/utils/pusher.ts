import Pusher, { Members } from "pusher-js"
import { useEffect, useState } from "react"
import { env } from "~/env.mjs"
import { useSessionStore } from "~/store/session"
import { PusherEventMap } from "./enums"

export type PusherMembersInfo = {
  name: string
  surname: string
  patronymic?: string
}

export type PusherMember = {
  id: string
  info: PusherMembersInfo
}

export const useChannelSubscribe = <T>(
  channelName: string,
  event: PusherEventMap,
  callback: (data: T) => void
) => {
  useEffect(() => {
    const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    })

    pusherClient.connect()

    const channel = pusherClient.subscribe(channelName)

    channel.bind(event, callback)

    return () => {
      pusherClient.disconnect()
    }
  }, [channelName, event])
}

export const usePresenceChannelSubscribe = <T>(
  channelName: string,
  event: PusherEventMap,
  callback: (data: T) => void
) => {
  const sessionStore = useSessionStore()
  const [members, setMembers] = useState<Map<string, PusherMembersInfo>>(
    new Map()
  )

  const updateMembers = (data: Members) => {
    setMembers(new Map(Object.entries(data.members)))
  }

  const addMember = (data: PusherMember) => {
    setMembers((prevState) => new Map([...prevState, [data.id, data.info]]))
  }

  const removeMember = (data: PusherMember) => {
    setMembers(
      (prevState) =>
        new Map(Array.from(prevState).filter(([key, value]) => key !== data.id))
    )
  }

  useEffect(() => {
    if (!sessionStore.user || !sessionStore.user.id) return

    const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "/api/pusher/auth-channel",
      auth: {
        headers: { user_id: sessionStore.user.id },
      },
    })

    pusherClient.connect()

    const channel = pusherClient.subscribe(`presence-${channelName}`)

    channel.bind(event, callback)

    channel.bind("pusher:subscription_succeeded", updateMembers)
    channel.bind("pusher:member_added", addMember)
    channel.bind("pusher:member_removed", removeMember)

    return () => {
      pusherClient.disconnect()
    }
  }, [sessionStore.token, sessionStore.user, channelName, event])

  return members
}
