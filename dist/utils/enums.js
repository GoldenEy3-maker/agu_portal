"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisKeyMap = exports.LocalStorageKeyMap = exports.CookieKeyMap = exports.ModalKeyMap = exports.PagePathMap = void 0;
exports.PagePathMap = {
    HomePage: "/",
    NotificationsPage: "/notifications",
    ChatPage: "/chat",
    CoursesPage: "/courses",
    UsersPage: "/users",
    SchedulerPage: "/scheduler",
    SupportPage: "/support",
    SettingsPage: "/settings",
};
exports.ModalKeyMap = {
    SignIn: "sign-in",
    LogOut: "log-out",
    Sidebar: "sidebar",
    Chat: "chat",
    DeleteNotifications: "delete-notifications",
};
exports.CookieKeyMap = {
    RefreshToken: "_v",
};
exports.LocalStorageKeyMap = {
    isDarkTheme: "_d",
};
exports.RedisKeyMap = {
    Notifications: "notifications",
};
