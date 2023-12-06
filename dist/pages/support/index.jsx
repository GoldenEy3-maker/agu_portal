"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("~/layouts/main"));
const SupportPage = () => {
    return <main>Страница поддержки</main>;
};
SupportPage.getLayout = (page) => <main_1.default>{page}</main_1.default>;
exports.default = SupportPage;
