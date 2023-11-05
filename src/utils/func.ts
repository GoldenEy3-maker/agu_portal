export const cls = (
  ...classes: (string | undefined | Record<string, boolean>)[]
) => {
  const result: string[] = []
  const filteredCls = classes.filter((c) => c !== undefined)

  for (const item of filteredCls) {
    if (typeof item === "string") result.push(item)
    else if (typeof item === "object") {
      for (const keyCls of Object.keys(item)) {
        if (item[keyCls]) result.push(keyCls)
      }
    }
  }

  return result.join(" ")
}

export const toUpperCaseInitialLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getProdUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
}

export const getDevUrl = () => {
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""

  return getProdUrl() ?? getDevUrl()
}
