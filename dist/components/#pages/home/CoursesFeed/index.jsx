"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const rippleEffect_hook_1 = require("~/hooks/rippleEffect.hook");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const COURSES_FEED_DATA = [
    {
        id: 1,
        title: "Менеджмент в профессиональной деятельности",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 2,
        title: "Иностранный язык в профессиональной деятельности",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 3,
        title: "Операционные системы и среды",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 4,
        title: "Менеджмент в профессиональной деятельности",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 5,
        title: "Операционные системы и среды",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 6,
        title: "Менеджмент в профессиональной деятельности",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 7,
        title: "Иностранный язык в профессиональной деятельности",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
    {
        id: 8,
        title: "Иностранный язык в профессиональной деятельности",
        logo: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
        author: "Иванов И.И",
        institute: "Колледж",
    },
];
const CoursesFeed = () => {
    const rippleEffectEvent = (0, rippleEffect_hook_1.useRippleEffect)();
    return (<div className={styles_module_sass_1.default.wrapper}>
      {COURSES_FEED_DATA.map((data) => (<link_1.default href="#" key={data.id} className={styles_module_sass_1.default.item} onPointerDown={rippleEffectEvent}>
          <p className={styles_module_sass_1.default.title}>{data.title}</p>
          <p className={styles_module_sass_1.default.description}>{data.description}</p>
          <footer className={styles_module_sass_1.default.footer}>
            <span>Автор: {data.author}</span>
            <span>{data.institute}</span>
          </footer>
        </link_1.default>))}
    </div>);
};
exports.default = CoursesFeed;
