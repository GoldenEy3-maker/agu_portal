"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("~/utils/api");
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/ru");
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const react_hot_toast_1 = require("react-hot-toast");
const react_loading_skeleton_1 = require("react-loading-skeleton");
require("react-loading-skeleton/dist/skeleton.css");
require("~/styles/globals.sass");
dayjs_1.default.locale("ru");
dayjs_1.default.extend(relativeTime_1.default);
const MyApp = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || ((page) => page);
    return (<react_loading_skeleton_1.SkeletonTheme baseColor="hsl(var(--placeholder-hsl))">
      {getLayout(<Component {...pageProps}/>)}
      <react_hot_toast_1.Toaster position="top-center"/>
    </react_loading_skeleton_1.SkeletonTheme>);
};
exports.default = api_1.api.withTRPC(MyApp);
