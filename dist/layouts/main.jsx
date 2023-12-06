"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = require("next/font/google");
const head_1 = __importDefault(require("next/head"));
const ModalContaier_1 = __importDefault(require("~/components/#layouts/main/ModalContaier"));
const Footer_1 = __importDefault(require("~/components/Footer"));
const Header_1 = __importDefault(require("~/components/Header"));
const Sidebar_1 = __importDefault(require("~/components/Sidebar"));
const inter = (0, google_1.Inter)({ subsets: ["cyrillic", "latin"] });
const MainLayout = (props) => {
    var _a;
    return (<>
      <head_1.default>
        <title>{(_a = props.title) !== null && _a !== void 0 ? _a : "Цифровой университет АлтГУ"}</title>
        <meta name="description" content="Цифровой универстите АлтГУ"/>
        <link rel="icon" type="image/png" href="/favicon.png"/>
      </head_1.default>
      <div className={inter.className}>
        <div className="wrapper">
          <Header_1.default />
          <Sidebar_1.default />
          {props.children}
        </div>
        <Footer_1.default />
        <ModalContaier_1.default />
      </div>
    </>);
};
exports.default = MainLayout;
