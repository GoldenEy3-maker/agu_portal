"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const react_1 = require("react");
const func_1 = require("~/utils/func");
const Button_1 = __importDefault(require("../Button"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
exports.Trigger = (0, react_1.forwardRef)((props, ref) => {
    return (<Button_1.default {...props} ref={ref} className={(0, func_1.cls)(styles_module_sass_1.default.trigger, props.className)}>
        {props.children}
      </Button_1.default>);
});
