"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fieldset = void 0;
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Fieldset = ({ legend, type, ...props }) => {
    return (<fieldset {...props} className={(0, func_1.cls)(styles_module_sass_1.default.fieldset, props.className)}>
      {legend ? <legend>{legend}</legend> : null}
      {props.children}
    </fieldset>);
};
exports.Fieldset = Fieldset;
