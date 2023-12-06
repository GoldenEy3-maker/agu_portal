"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Root = ({ state, asDrawer, position, ...props }) => {
    var _a, _b;
    return (<div {...props} className={(0, func_1.cls)(styles_module_sass_1.default.root, props.className, {
            [(_a = styles_module_sass_1.default._drawer) !== null && _a !== void 0 ? _a : ""]: !!asDrawer,
            [(_b = styles_module_sass_1.default._leftPos) !== null && _b !== void 0 ? _b : ""]: !!asDrawer && position === "left",
        })} aria-hidden={!state}>
      <div data-modal-root className={styles_module_sass_1.default.rootWrapper}>
        {props.children}
      </div>
    </div>);
};
exports.Root = Root;
