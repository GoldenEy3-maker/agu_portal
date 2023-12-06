"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inputs = void 0;
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Inputs = (props) => {
    return (<div {...props} className={(0, func_1.cls)(styles_module_sass_1.default.inputs, props.className)}>
      {props.children}
    </div>);
};
exports.Inputs = Inputs;
