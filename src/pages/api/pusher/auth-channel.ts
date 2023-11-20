import { NextApiHandler } from "next"
import { z } from "zod"
import { db } from "~/server/db"
import { pusher } from "~/server/pusher"

const handler: NextApiHandler = async (req, res) => {
  const { channel_name, socket_id } = z
    .object({ channel_name: z.string(), socket_id: z.string() })
    .parse(req.body)
  const { user_id } = req.headers

  if (!user_id || typeof user_id !== "string") {
    res.status(404).send("Unauthorized")
    return
  }

  const user = await db.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    res.status(404).send("Unauthorized")
    return
  }

  try {
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
    res.status(404).send("Unauthorized")
  }
}

export default handler
