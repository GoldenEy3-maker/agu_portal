import Pusher from "pusher-js"

Pusher.logToConsole = process.env.NODE_ENV === "development"

export const pusher = new Pusher("d35d2cba55ec5d76f28e", {
  cluster: "eu",
})
