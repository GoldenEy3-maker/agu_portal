"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_loading_skeleton_1 = __importDefault(require("react-loading-skeleton"));
const LoadingSkeleton = () => {
    return (<>
      <react_loading_skeleton_1.default width={45} height={45} circle/>
      <react_loading_skeleton_1.default width={45} height={45} circle/>
      <react_loading_skeleton_1.default width={45} height={45} circle/>
    </>);
};
exports.default = LoadingSkeleton;
