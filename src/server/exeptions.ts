import { TRPCError } from "@trpc/server"
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"

export default class ApiError extends TRPCError {
  constructor(code: TRPC_ERROR_CODE_KEY, message?: string) {
    super({ code, message })
  }

  static BadRequest(message?: string) {
    return new ApiError("BAD_REQUEST", message)
  }

  static ServerError(message?: string) {
    return new ApiError("INTERNAL_SERVER_ERROR", message)
  }

  static Unauthorized(message?: string) {
    return new ApiError(
      "UNAUTHORIZED",
      message ?? "Неавторизованный пользователь!"
    )
  }
}
