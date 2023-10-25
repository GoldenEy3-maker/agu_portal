import { httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import superjson from "superjson"

import { type AppRouter } from "~/server/api/root"
import { useUserStore } from "~/store/user"
import { getBaseUrl } from "./func"

export const api = createTRPCNext<AppRouter>({
  config() {
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
              }

              useUserStore.setState({ token: refreshData.accessToken })

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
          headers(opts) {
            const token = useUserStore.getState().token

            if (!token) return {}

            return {
              ...opts,
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
