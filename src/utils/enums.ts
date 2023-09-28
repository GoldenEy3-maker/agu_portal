import { ValueOf } from "./types"

export const PagePaths = {
  HomePage: "/",
  NotificationsPage: "/notifications",
  ChatPage: "/chat",
  CoursesPage: "/courses",
  UsersPage: "/users",
  SchedulerPage: "/scheduler",
  SupportPage: "/support",
  SettingsPage: "/settings",
} as const

export const ModalKeys = {
  SignIn: "sign-in",
  SingOut: "sing-out",
  Test: "test",
} as const

export type PagePaths = ValueOf<typeof PagePaths>
export type ModalKeys = ValueOf<typeof ModalKeys>
