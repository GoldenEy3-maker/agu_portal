"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const main_1 = __importDefault(require("~/layouts/main"));
const CoursePage = () => {
    const router = (0, router_1.useRouter)();
    return <main>Страница курса - {router.query.id}</main>;
};
CoursePage.getLayout = (page) => <main_1.default>{page}</main_1.default>;
exports.default = CoursePage;
