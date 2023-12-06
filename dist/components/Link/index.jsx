"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const react_1 = require("react");
const rippleEffect_hook_1 = require("~/hooks/rippleEffect.hook");
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Link = (0, react_1.forwardRef)(({ href, locale, shallow, scroll, replace, children, variant, activeClassName, asIcon, size, color, ...props }, ref) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const router = (0, router_1.useRouter)();
    const rippleEffectEvent = (0, rippleEffect_hook_1.useRippleEffect)();
    const isActive = href !== "/"
        ? router.asPath.includes(href.toString())
        : router.asPath === href;
    return (<link_1.default href={href} locale={locale} shallow={shallow} scroll={scroll} replace={replace} passHref legacyBehavior>
        <a {...props} className={(0, func_1.cls)(styles_module_sass_1.default.link, props.className, {
            [(_a = styles_module_sass_1.default._elevated) !== null && _a !== void 0 ? _a : ""]: variant === "elevated",
            [(_b = styles_module_sass_1.default._filled) !== null && _b !== void 0 ? _b : ""]: variant === "filled",
            [(_c = styles_module_sass_1.default._outlined) !== null && _c !== void 0 ? _c : ""]: variant === "outlined",
            [(_d = styles_module_sass_1.default._asIcon) !== null && _d !== void 0 ? _d : ""]: asIcon,
            [(_e = styles_module_sass_1.default._sm) !== null && _e !== void 0 ? _e : ""]: size === "sm",
            [(_f = styles_module_sass_1.default._defaultClr) !== null && _f !== void 0 ? _f : ""]: color === "default",
            [(_g = styles_module_sass_1.default._dangerClr) !== null && _g !== void 0 ? _g : ""]: color === "danger",
            [(_h = styles_module_sass_1.default._onPrimaryClr) !== null && _h !== void 0 ? _h : ""]: color === "on-primary",
            [(_j = styles_module_sass_1.default._successClr) !== null && _j !== void 0 ? _j : ""]: color === "success",
            [activeClassName !== null && activeClassName !== void 0 ? activeClassName : ""]: isActive,
        })} onPointerDown={rippleEffectEvent} ref={ref}>
          {typeof children === "function" ? children(isActive) : children}
        </a>
      </link_1.default>);
});
Link.displayName = "Link";
exports.default = Link;
