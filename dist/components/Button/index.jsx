"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const rippleEffect_hook_1 = require("~/hooks/rippleEffect.hook");
const func_1 = require("~/utils/func");
const LoadingIcon_1 = __importDefault(require("../LoadingIcon"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Button = (0, react_1.forwardRef)(({ variant, asIcon, color = "primary", textAlign, size, loading, isActive, ...props }, ref) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const rippleEffectEvent = (0, rippleEffect_hook_1.useRippleEffect)();
    const isLoading = loading || (props.type === "submit" && props.disabled);
    return (<button {...props} className={(0, func_1.cls)(styles_module_sass_1.default.btn, props.className, {
            [(_a = styles_module_sass_1.default._filled) !== null && _a !== void 0 ? _a : ""]: variant === "filled",
            [(_b = styles_module_sass_1.default._elevated) !== null && _b !== void 0 ? _b : ""]: variant === "elevated",
            [(_c = styles_module_sass_1.default._outlined) !== null && _c !== void 0 ? _c : ""]: variant === "outlined",
            [(_d = styles_module_sass_1.default._asIcon) !== null && _d !== void 0 ? _d : ""]: asIcon,
            [(_e = styles_module_sass_1.default._dangerClr) !== null && _e !== void 0 ? _e : ""]: color === "danger",
            [(_f = styles_module_sass_1.default._successClr) !== null && _f !== void 0 ? _f : ""]: color === "success",
            [(_g = styles_module_sass_1.default._defaultClr) !== null && _g !== void 0 ? _g : ""]: color === "default",
            [(_h = styles_module_sass_1.default._textAlignCenter) !== null && _h !== void 0 ? _h : ""]: textAlign === "center",
            [(_j = styles_module_sass_1.default._textAlignRight) !== null && _j !== void 0 ? _j : ""]: textAlign === "right",
            [(_k = styles_module_sass_1.default._sm) !== null && _k !== void 0 ? _k : ""]: size === "sm",
            [(_l = styles_module_sass_1.default._isActive) !== null && _l !== void 0 ? _l : ""]: !!isActive,
        })} onPointerDown={rippleEffectEvent} ref={ref}>
        {isLoading ? <LoadingIcon_1.default /> : null}
        {isLoading && asIcon ? null : props.children}
      </button>);
});
exports.default = Button;
