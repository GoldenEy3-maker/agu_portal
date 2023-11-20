import { User } from "@prisma/client"
import { httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import superjson from "superjson"
import { type AppRouter } from "~/server/api/root"
import { useSessionStore } from "~/store/session"
import { getBaseUrl } from "./func"

export const api = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async fetch(url, options) {
            const userStore = useSessionStore.getState()

            const response = await fetch(url, {
              ...options,
              credentials: "include",
            })

            if (response.status === 401) {
              const refreshResponse = await fetch(
                `${getBaseUrl()}/api/refresh_token`,
                {
                  method: "POST",
                  credentials: "include",
                }
              )
              if (!refreshResponse.ok) return refreshResponse

              const refreshData = (await refreshResponse.json()) as {
                accessToken: string
                user: User
              }

              userStore.setToken(refreshData.accessToken)
              userStore.setUser(refreshData.user)

              return await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                  ...options?.headers,
                  authorization: `Bearer ${refreshData.accessToken}`,
                },
              })
            }

            return response
          },
          headers() {
            const token = useSessionStore.getState().token
            const headers = ctx?.req?.headers

            if (!token) return { ...headers }

            return {
              ...headers,
              authorization: `Bearer ${token}`,
            }
          },
        }),
      ],
    }
  },
  ssr: false,
})

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
