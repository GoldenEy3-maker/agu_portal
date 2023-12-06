"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const Icons_1 = require("../Icons");
const UserAvatar = (props) => {
    var _a;
    if (!props.src)
        return <Icons_1.IconUser />;
    return (<image_1.default src={props.src} alt={(_a = props.alt) !== null && _a !== void 0 ? _a : ""} fill style={{ objectFit: "cover" }}/>);
};
exports.default = UserAvatar;
