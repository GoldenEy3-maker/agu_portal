"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Input = (0, react_1.forwardRef)(({ label, className, size, leadingIcon, errorMessage, ...props }, ref) => {
    var _a, _b, _c;
    return (<div className={(0, func_1.cls)(styles_module_sass_1.default.root, className, {
            [(_a = styles_module_sass_1.default._withLeadingIcon) !== null && _a !== void 0 ? _a : ""]: !!leadingIcon,
            [(_b = styles_module_sass_1.default._sm) !== null && _b !== void 0 ? _b : ""]: size === "sm",
            [(_c = styles_module_sass_1.default._error) !== null && _c !== void 0 ? _c : ""]: !!errorMessage,
        })}>
        {label ? <label htmlFor={props.id}>{label}</label> : null}
        <div className={styles_module_sass_1.default.wrapper}>
          <input {...props} ref={ref}/>
          {leadingIcon ? (<span className={styles_module_sass_1.default.leadingIcon}>{leadingIcon}</span>) : null}
        </div>
        {errorMessage ? (<p className={styles_module_sass_1.default.errorMessage}>{errorMessage}</p>) : null}
      </div>);
});
exports.default = Input;
