"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bi_1 = require("react-icons/bi");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const LoadingIcon = () => {
    return <bi_1.BiLoader className={styles_module_sass_1.default.icon}/>;
};
exports.default = LoadingIcon;
