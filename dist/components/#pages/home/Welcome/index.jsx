"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const preview_jpg_1 = __importDefault(require("~/assets/preview.jpg"));
const Icons_1 = require("~/components/Icons");
const Link_1 = __importDefault(require("~/components/Link"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Welcome = () => {
    return (<section className={styles_module_sass_1.default.welcome}>
      <div className={styles_module_sass_1.default.wrapper}>
        <image_1.default src={preview_jpg_1.default} alt="" blurDataURL={preview_jpg_1.default.blurDataURL} fill style={{ objectFit: "cover" }}/>
        <div className={styles_module_sass_1.default.overlay}>
          <h2>Алтайский государственный университет (АлтГУ)</h2>
          <p>
            — высшее учебное заведение, классический университет в Алтайском
            крае РФ. Образован сразу как классический университет в 1973 году.
            Ведёт учебную, научную и культурно-просветительскую деятельность.
            Расположен в Барнауле с филиалами в городах и сёлах края. В апреле
            2017 года стал одним из региональных опорных университетов. В
            декабре 2017 года распоряжением Минобрнауки РФ признан
            университетским центром инновационного, технологического и
            социального развития.
          </p>
          <Link_1.default variant="filled" href="https://www.asu.ru/" target="_blank">
            Перейти на сайт
            <Icons_1.IconRightArrowAlt />
          </Link_1.default>
        </div>
      </div>
    </section>);
};
exports.default = Welcome;
