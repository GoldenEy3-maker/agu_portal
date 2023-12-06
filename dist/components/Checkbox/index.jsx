"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
const rippleEffect_hook_1 = require("~/hooks/rippleEffect.hook");
const func_1 = require("~/utils/func");
const Button_1 = __importDefault(require("../Button"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Checkbox = (0, react_1.forwardRef)(({ label, leadingIcon, controllerPosition, ...props }, ref) => {
    var _a, _b;
    const rippleEffectEvent = (0, rippleEffect_hook_1.useRippleEffect)();
    const renderCheckboxIcon = () => {
        if (props.type === "check") {
            return props.checked ? <bi_1.BiCheck /> : null;
        }
        if (props.type === "extended-check") {
            if (props.value === "on")
                return <bi_1.BiCheck />;
            if (props.value === "off")
                return <bi_1.BiMinus />;
        }
        return null;
    };
    const changeHandler = () => {
        if (props.type === "check" || props.type === "switch") {
            props.onChange(!props.checked);
            return;
        }
        let value = undefined;
        let checked = !!props.checked;
        switch (props.value) {
            case "on":
                value = "off";
                checked = true;
            case "off":
                value = undefined;
                checked = false;
            default:
                value = "on";
                checked = true;
        }
        props.onChange(value, checked);
    };
    return (<div className={(0, func_1.cls)(styles_module_sass_1.default.root, props.className, {
            [(_a = styles_module_sass_1.default._controllerRight) !== null && _a !== void 0 ? _a : ""]: controllerPosition === "right",
            [(_b = styles_module_sass_1.default._switchController) !== null && _b !== void 0 ? _b : ""]: props.type === "switch",
        })}>
        <input {...props} type="checkbox" onChange={changeHandler} ref={ref}/>
        <div className={styles_module_sass_1.default.wrapper} onPointerDown={!props.disabled ? rippleEffectEvent : undefined}>
          <label htmlFor={props.id}>
            {leadingIcon ? (<span className={styles_module_sass_1.default.leadingIcon}>{leadingIcon}</span>) : null}
            <span>{label}</span>
          </label>
          <Button_1.default type="button" asIcon className={styles_module_sass_1.default.controller} onClick={changeHandler} tabIndex={-1} disabled={props.disabled}>
            {props.type !== "switch" ? (<span className={styles_module_sass_1.default.checkboxIcon}>
                {renderCheckboxIcon()}
              </span>) : (<div className={styles_module_sass_1.default.switchIcon}>
                <span></span>
              </div>)}
          </Button_1.default>
        </div>
      </div>);
});
exports.default = Checkbox;
