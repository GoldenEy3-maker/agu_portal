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
  SignOut: "sign-out",
  Sidebar: "sidebar",
} as const

export const CookieKeyMap = {
  RefreshToken: "_v",
}

export type PagePathMap = ValueOf<typeof PagePathMap>
export type ModalKeyMap = ValueOf<typeof ModalKeyMap>
export type CookieKeyMap = ValueOf<typeof CookieKeyMap>
