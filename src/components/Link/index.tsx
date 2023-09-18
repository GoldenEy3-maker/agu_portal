import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { useRouter } from "next/router"
import { forwardRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type LinkProps = {
  variant?: "elevated" | "filled" | "outlined"
  asIcon?: boolean
  activeClassName?: string
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> &
  Omit<NextLinkProps, "as" | "passHref" | "children">

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      locale,
      shallow,
      scroll,
      replace,
      children,
      variant,
      activeClassName,
      asIcon,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const rippleEffectEvent = useRippleEffect()

    const isActive =
      href !== "/"
        ? router.asPath.includes(href.toString())
        : router.asPath === href

    return (
      <NextLink
        href={href}
        locale={locale}
        shallow={shallow}
        scroll={scroll}
        replace={replace}
        passHref
        legacyBehavior
      >
        <a
          {...props}
          className={cls([styles.link, props.className], {
            [styles._elevated ?? ""]: variant === "elevated",
            [styles._filled ?? ""]: variant === "filled",
            [styles._outlined ?? ""]: variant === "outlined",
            [activeClassName ?? ""]: isActive,
            [styles._asIcon ?? ""]: asIcon!!,
          })}
          onPointerDown={rippleEffectEvent}
          ref={ref}
        >
          {typeof children === "function" ? children(isActive) : children}
        </a>
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export default Link
