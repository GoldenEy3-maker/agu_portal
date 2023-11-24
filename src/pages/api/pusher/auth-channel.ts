import { NextApiHandler } from "next"
import { z } from "zod"
import { db } from "~/server/db"
import ApiError from "~/server/exeptions"
import { pusher } from "~/server/pusher"

const handler: NextApiHandler = async (req, res) => {
  const { channel_name, socket_id } = z
    .object({ channel_name: z.string(), socket_id: z.string() })
    .parse(req.body)
  const { user_id } = req.headers

  try {
    if (!user_id || typeof user_id !== "string") throw ApiError.Unauthorized()

    const user = await db.user.findUnique({
      where: {
        id: user_id,
      },
    })

    if (!user) throw ApiError.Unauthorized()

    const auth = pusher.authorizeChannel(socket_id, channel_name, {
      user_id,
      user_info: {
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
      },
    })
    res.send(auth)
  } catch (error: unknown) {
    if (error instanceof ApiError)
      res.status(401).json({ message: error.message })

    res.status(400).json({ message: "Неожиданная ошибка!" })
  }
}

export default handler
