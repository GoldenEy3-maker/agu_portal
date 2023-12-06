"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Link_1 = __importDefault(require("~/components/Link"));
const sidebar_1 = require("~/store/sidebar");
const enums_1 = require("~/utils/enums");
const func_1 = require("~/utils/func");
const Button_1 = __importDefault(require("../Button"));
const Icons_1 = require("../Icons");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Sidebar = (props) => {
    var _a;
    const sidebarStore = (0, sidebar_1.useSidebarStore)();
    const isExpanded = props.isModal ? true : sidebarStore.isExpanded;
    return (<aside className={(0, func_1.cls)(styles_module_sass_1.default.aside, {
            [(_a = styles_module_sass_1.default._modal) !== null && _a !== void 0 ? _a : ""]: !!props.isModal,
        })} aria-expanded={isExpanded}>
      <nav className={styles_module_sass_1.default.nav}>
        <div className={styles_module_sass_1.default.navGroup}>
          <Link_1.default href={enums_1.PagePathMap.HomePage} activeClassName={styles_module_sass_1.default.activeNavLink} className={styles_module_sass_1.default.navLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidHome /> : <Icons_1.IconHome />}
                <span>Главная</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.UsersPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidGroup /> : <Icons_1.IconGroup />}
                <span>Люди</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.SchedulerPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidCalendar /> : <Icons_1.IconCalendar />}
                <span>Календарь</span>
              </>)}
          </Link_1.default>
        </div>
        <div className={styles_module_sass_1.default.navGroup}>
          <span className={styles_module_sass_1.default.navGroupLabel}>Курсы</span>
          <div className={styles_module_sass_1.default.navGroupList}>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>
            <Link_1.default href={enums_1.PagePathMap.CoursesPage + "/1"} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link_1.default>

            <Button_1.default className={styles_module_sass_1.default.navLink} color="default">
              <Icons_1.IconChevronDown />
              <span>Раскрыть</span>
            </Button_1.default>
          </div>
        </div>
        <div className={styles_module_sass_1.default.navGroup}>
          <Link_1.default href={enums_1.PagePathMap.SettingsPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidCog /> : <Icons_1.IconCog />}
                <span>Настройки</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.SupportPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidHelpCircle /> : <Icons_1.IconHelpCircle />}
                <span>Поддержка</span>
              </>)}
          </Link_1.default>
        </div>
      </nav>
      <nav className={(0, func_1.cls)(styles_module_sass_1.default.nav, styles_module_sass_1.default._shrinked)}>
        <div className={styles_module_sass_1.default.navGroup}>
          <Link_1.default href={enums_1.PagePathMap.HomePage} activeClassName={styles_module_sass_1.default.activeNavLink} className={styles_module_sass_1.default.navLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidHome /> : <Icons_1.IconHome />}
                <span>Главная</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.CoursesPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidFolder /> : <Icons_1.IconFolder />}
                <span>Курсы</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.UsersPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidGroup /> : <Icons_1.IconGroup />}
                <span>Люди</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.SchedulerPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidCalendar /> : <Icons_1.IconCalendar />}
                <span>Календарь</span>
              </>)}
          </Link_1.default>
          <Link_1.default href={enums_1.PagePathMap.SupportPage} className={styles_module_sass_1.default.navLink} activeClassName={styles_module_sass_1.default.activeNavLink} color="default">
            {(isActive) => (<>
                {isActive ? <Icons_1.IconSolidHelpCircle /> : <Icons_1.IconHelpCircle />}
                <span>Поддержка</span>
              </>)}
          </Link_1.default>
        </div>
      </nav>
    </aside>);
};
exports.default = Sidebar;
