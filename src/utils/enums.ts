import { ValueOf } from "./types"

export const PagePaths = {
  HomePage: "/",
  NotificationsPage: "/notifications",
  ChatPage: "/chat",
  CoursesPage: "/courses",
  UsersPage: "/users",
  StatisticsPage: "/statistics",
  SupportPage: "/support",
  SettingsPage: "/settings",
} as const

export type PagePaths = ValueOf<typeof PagePaths>
