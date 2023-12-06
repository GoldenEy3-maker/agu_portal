"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Close = void 0;
const react_1 = require("react");
const Icons_1 = require("~/components/Icons");
const Button_1 = __importDefault(require("../Button"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
exports.Close = (0, react_1.forwardRef)((props, ref) => {
    return (<div className={styles_module_sass_1.default.close}>
      <Button_1.default {...props} ref={ref} asIcon type="button" color="default">
        <Icons_1.IconX />
      </Button_1.default>
    </div>);
});
