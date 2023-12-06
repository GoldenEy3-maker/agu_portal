"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoursesFeed_1 = __importDefault(require("~/components/#pages/home/CoursesFeed"));
const NewsFeed_1 = __importDefault(require("~/components/#pages/home/NewsFeed"));
const Welcome_1 = __importDefault(require("~/components/#pages/home/Welcome"));
const Calendar_1 = __importDefault(require("~/components/Calendar"));
const Icons_1 = require("~/components/Icons");
const Link_1 = __importDefault(require("~/components/Link"));
const Section = __importStar(require("~/components/Section"));
const main_1 = __importDefault(require("~/layouts/main"));
const enums_1 = require("~/utils/enums");
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const HomePage = () => {
    return (<main className={(0, func_1.cls)(styles_module_sass_1.default.main, "content-grid")}>
      <Welcome_1.default />
      <Section.Group>
        <Section.Root isSpanGridArea>
          <Section.Header>
            <Section.Title>
              <Icons_1.IconFolder /> Курсы
            </Section.Title>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage} variant="elevated" size="sm">
              Посмотреть все <Icons_1.IconRightArrowAlt />
            </Link_1.default>
          </Section.Header>
          <Section.Content>
            <CoursesFeed_1.default />
          </Section.Content>
        </Section.Root>
        <Section.Root isSpanGridArea>
          <Section.Header>
            <Section.Title>
              <Icons_1.IconNews /> Новости
            </Section.Title>
            <Link_1.default variant="elevated" size="sm" href="https://www.asu.ru/news/" target="_blank">
              Посмотреть все
              <Icons_1.IconRightArrowAlt />
            </Link_1.default>
          </Section.Header>
          <Section.Content>
            <NewsFeed_1.default />
          </Section.Content>
        </Section.Root>
        <Section.Root>
          <Section.Header>
            <Section.Title>
              <Icons_1.IconCalendar /> Календарь
            </Section.Title>
          </Section.Header>
          <Section.Content>
            <Calendar_1.default />
          </Section.Content>
        </Section.Root>
        <Section.Root>
          <Section.Header>
            <Section.Title>Не знаешь с чего начать?</Section.Title>
          </Section.Header>
          <Section.Content>
            <iframe className={styles_module_sass_1.default.videoFrame} width="100%" height="315" src="https://www.youtube.com/embed/j70dL0JZXGI?si=S8Gad7Il1421X1mJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </Section.Content>
        </Section.Root>
      </Section.Group>
    </main>);
};
HomePage.getLayout = (page) => <main_1.default>{page}</main_1.default>;
exports.default = HomePage;
