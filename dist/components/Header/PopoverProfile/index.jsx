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
const react_1 = require("react");
const Button_1 = __importDefault(require("~/components/Button"));
const Checkbox_1 = __importDefault(require("~/components/Checkbox"));
const Icons_1 = require("~/components/Icons");
const Link_1 = __importDefault(require("~/components/Link"));
const Popover = __importStar(require("~/components/Popover"));
const UserAvatar_1 = __importDefault(require("~/components/UserAvatar"));
const localStorage_1 = require("~/hooks/localStorage");
const modal_1 = require("~/store/modal");
const session_1 = require("~/store/session");
const enums_1 = require("~/utils/enums");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const PopoverProfile = () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const [isPopoverOpen, setIsPopoverOpen] = (0, react_1.useState)(false);
    const sessionStore = (0, session_1.useSessionStore)();
    const modalStore = (0, modal_1.useModalStore)();
    const closePopoverHandler = () => setIsPopoverOpen(false);
    const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState);
    const [isDarkTheme, setIsDarkTheme] = (0, localStorage_1.useLocalStorage)(enums_1.LocalStorageKeyMap.isDarkTheme, false);
    return (<Popover.Root closeHandler={closePopoverHandler}>
      <Popover.Trigger variant="filled" asIcon onClick={togglePopoverHandler}>
        <UserAvatar_1.default />
      </Popover.Trigger>
      <Popover.Wrapper isOpen={isPopoverOpen}>
        <Popover.Content>
          <div className={styles_module_sass_1.default.profile}>
            <div className={styles_module_sass_1.default.profileImg}>
              <span>
                <UserAvatar_1.default src={(_a = sessionStore.user) === null || _a === void 0 ? void 0 : _a.avatar}/>
              </span>
            </div>
            <p className={styles_module_sass_1.default.credentials}>
              <strong>
                {(_b = sessionStore.user) === null || _b === void 0 ? void 0 : _b.surname}&nbsp;{(_c = sessionStore.user) === null || _c === void 0 ? void 0 : _c.name}
                &nbsp;
                {(_d = sessionStore.user) === null || _d === void 0 ? void 0 : _d.patronymic}
              </strong>
              &nbsp;
              <span className={styles_module_sass_1.default.credentialsRole}>
                {(_e = sessionStore.user) === null || _e === void 0 ? void 0 : _e.role}
              </span>
            </p>
            <p className={styles_module_sass_1.default.profileEmail}>
              {(_g = (_f = sessionStore.user) === null || _f === void 0 ? void 0 : _f.email) !== null && _g !== void 0 ? _g : "Email не привязан"}
            </p>
          </div>
          <nav className={styles_module_sass_1.default.nav}>
            <Checkbox_1.default label="Темная тема" type="switch" leadingIcon={<Icons_1.IconMoon />} controllerPosition="right" checked={isDarkTheme} name="change-theme" id="change-theme" className={styles_module_sass_1.default.themeController} onChange={(checked) => setIsDarkTheme(checked)}/>
            <hr />
            <Link_1.default color="default" href={enums_1.PagePathMap.CoursesPage} className={styles_module_sass_1.default.navLink}>
              <Icons_1.IconFolder /> <span>Курсы</span>
            </Link_1.default>
            <Link_1.default color="default" href={enums_1.PagePathMap.SchedulerPage} className={styles_module_sass_1.default.navLink}>
              <Icons_1.IconCalendar /> <span>Расписание</span>
            </Link_1.default>
            <Link_1.default color="default" href={enums_1.PagePathMap.SettingsPage} className={styles_module_sass_1.default.navLink}>
              <Icons_1.IconCog /> <span>Настройки</span>
            </Link_1.default>
            <hr />
            <Button_1.default type="button" color="danger" className={styles_module_sass_1.default.navLink} onClick={(event) => {
            modalStore.open({
                key: enums_1.ModalKeyMap.LogOut,
                target: event.currentTarget,
            });
            closePopoverHandler();
        }}>
              <Icons_1.IconLogOut /> <span>Выход</span>
            </Button_1.default>
          </nav>
        </Popover.Content>
      </Popover.Wrapper>
    </Popover.Root>);
};
exports.default = PopoverProfile;
