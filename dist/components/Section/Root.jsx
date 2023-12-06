"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Root = ({ isSpanGridArea, ...props }) => {
    var _a;
    return (<section {...props} className={(0, func_1.cls)(styles_module_sass_1.default.root, props.className, {
            [(_a = styles_module_sass_1.default._spanGridArea) !== null && _a !== void 0 ? _a : ""]: !!isSpanGridArea,
        })}>
      {props.children}
    </section>);
};
exports.Root = Root;
