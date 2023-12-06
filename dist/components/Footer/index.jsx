"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const Link_1 = __importDefault(require("~/components/Link"));
const func_1 = require("~/utils/func");
const Icons_1 = require("../Icons");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Footer = () => {
    return (<footer className={(0, func_1.cls)(styles_module_sass_1.default.footer, "content-grid")}>
      <header className={styles_module_sass_1.default.header}>
        <div className={styles_module_sass_1.default.symbols}>
          <span className={styles_module_sass_1.default.logo}>
            <Icons_1.IconLogoUniversV1 />
          </span>
          <div>
            <h3 className={styles_module_sass_1.default.title}>
              Алтайский государственный университет
            </h3>
            <p className={styles_module_sass_1.default.address}>
              ФГБОУ ВО «Алтайский государственный университет» 656049, Барнаул,
              пр. Ленина, 61
            </p>
          </div>
        </div>
        <div className={styles_module_sass_1.default.social}>
          <Link_1.default asIcon color="on-primary" href={"#"} target="_blank">
            <Icons_1.IconLogoTelegram />
          </Link_1.default>
          <Link_1.default asIcon color="on-primary" href={"#"} target="_blank">
            <Icons_1.IconLogoVk />
          </Link_1.default>
          <Link_1.default asIcon color="on-primary" href={"#"} target="_blank">
            <Icons_1.IconLogoYoutube />
          </Link_1.default>
          <Link_1.default asIcon color="on-primary" href={"#"} target="_blank">
            <Icons_1.IconLogoOkRu />
          </Link_1.default>
        </div>
      </header>
      <nav className={styles_module_sass_1.default.nav}>
        <div className={styles_module_sass_1.default.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles_module_sass_1.default.navLinks}>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
          </div>
        </div>
        <div className={styles_module_sass_1.default.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles_module_sass_1.default.navLinks}>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
          </div>
        </div>
        <div className={styles_module_sass_1.default.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles_module_sass_1.default.navLinks}>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
          </div>
        </div>
        <div className={styles_module_sass_1.default.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles_module_sass_1.default.navLinks}>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
            <link_1.default href="#">Ссылка</link_1.default>
          </div>
        </div>
      </nav>
      <div className={styles_module_sass_1.default.contacts}>
        <p>
          Приемная комиссия АлтГУ,{" "}
          <link_1.default href="mailto:prcom@asu.ru">prcom@asu.ru</link_1.default>, тел.{" "}
          <link_1.default href="tel:3852291222">(3852) 291-222</link_1.default>
        </p>
        <p>
          Ректор Алтайского государственного университета,{" "}
          <link_1.default href="mailto:rector@asu.ru">rector@asu.ru</link_1.default>, тел.{" "}
          <link_1.default href="tel:3852291291">(3852) 291-291</link_1.default>
        </p>
        <p>
          При полном или частичном использовании материалов сайта ссылка на сайт
          АлтГУ обязательна.
        </p>
      </div>
    </footer>);
};
exports.default = Footer;
