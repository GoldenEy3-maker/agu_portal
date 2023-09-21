export const cls = (
  cls: (string | undefined)[],
  conditionCls?: Record<string, boolean>
) => {
  const filteredCls = cls.filter((c) => c !== undefined)

  if (conditionCls) {
    Object.keys(conditionCls).forEach((key) => {
      if (conditionCls[key]) {
        filteredCls.push(key)
      }
    })
  }

  return filteredCls.join(" ")
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
