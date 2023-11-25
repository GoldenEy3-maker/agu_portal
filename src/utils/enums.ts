import { ValueOf } from "./types"

export const PagePathMap = {
  HomePage: "/",
  NotificationsPage: "/notifications",
  ChatPage: "/chat",
  CoursesPage: "/courses",
  UsersPage: "/users",
  SchedulerPage: "/scheduler",
  SupportPage: "/support",
  SettingsPage: "/settings",
} as const

export const ModalKeyMap = {
  SignIn: "sign-in",
  LogOut: "log-out",
  Sidebar: "sidebar",
  Chat: "chat",
} as const

export const CookieKeyMap = {
  RefreshToken: "_v",
} as const

export const LocalStorageKeyMap = {
  isDarkTheme: "_d",
} as const

export const PusherChannelMap = {
  Auth: "auth-channel",
} as const

export const PusherEventMap = {
  SignInUser: "sing-in-user",
  SingOutUser: "sing-out-user",
  SendNotification: "send-notification",
} as const

export type PagePathMap = ValueOf<typeof PagePathMap>
export type ModalKeyMap = ValueOf<typeof ModalKeyMap>
export type CookieKeyMap = ValueOf<typeof CookieKeyMap>
export type LocalStorageKeyMap = ValueOf<typeof LocalStorageKeyMap>
export type PusherChannelMap = ValueOf<typeof PusherChannelMap>
export type PusherEventMap = ValueOf<typeof PusherEventMap>
