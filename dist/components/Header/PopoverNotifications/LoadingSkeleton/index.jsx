"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_loading_skeleton_1 = __importDefault(require("react-loading-skeleton"));
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("../styles.module.sass"));
const LoadingSkeleton = () => {
    return (<ul className={(0, func_1.cls)(styles_module_sass_1.default.list, styles_module_sass_1.default._loadingSkeleton)}>
      <li className={styles_module_sass_1.default.item}>
        <react_loading_skeleton_1.default width={50} height={50} circle containerClassName={styles_module_sass_1.default.avatar}/>
        <react_loading_skeleton_1.default height="1rem" containerClassName={styles_module_sass_1.default.text}/>
        <react_loading_skeleton_1.default height="1rem" containerClassName={styles_module_sass_1.default.extraInfo}/>
      </li>
      <li className={styles_module_sass_1.default.item}>
        <react_loading_skeleton_1.default width={50} height={50} circle containerClassName={styles_module_sass_1.default.avatar}/>
        <react_loading_skeleton_1.default height="1rem" containerClassName={styles_module_sass_1.default.text}/>
        <react_loading_skeleton_1.default height="1rem" containerClassName={styles_module_sass_1.default.extraInfo}/>
      </li>
      <li className={styles_module_sass_1.default.item}>
        <react_loading_skeleton_1.default width={50} height={50} circle containerClassName={styles_module_sass_1.default.avatar}/>
        <react_loading_skeleton_1.default height="1rem" containerClassName={styles_module_sass_1.default.text}/>
        <react_loading_skeleton_1.default height="1rem" containerClassName={styles_module_sass_1.default.extraInfo}/>
      </li>
    </ul>);
};
exports.default = LoadingSkeleton;
