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
const dayjs_1 = __importDefault(require("dayjs"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const Button_1 = __importDefault(require("~/components/Button"));
const Icons_1 = require("~/components/Icons");
const Popover = __importStar(require("~/components/Popover"));
const UserAvatar_1 = __importDefault(require("~/components/UserAvatar"));
const rippleEffect_hook_1 = require("~/hooks/rippleEffect.hook");
const modal_1 = require("~/store/modal");
const session_1 = require("~/store/session");
const api_1 = require("~/utils/api");
const enums_1 = require("~/utils/enums");
const func_1 = require("~/utils/func");
const LoadingSkeleton_1 = __importDefault(require("./LoadingSkeleton"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const PopoverNotifications = () => {
    var _a, _b, _c;
    const [isPopoverOpen, setIsPopoverOpen] = (0, react_1.useState)(false);
    const modalStore = (0, modal_1.useModalStore)();
    const sessionStore = (0, session_1.useSessionStore)();
    const rippleEffectEvent = (0, rippleEffect_hook_1.useRippleEffect)();
    const closePopoverHandler = () => setIsPopoverOpen(false);
    const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState);
    const getNotificationsBySessionQuery = api_1.api.notification.getAllBySession.useQuery();
    api_1.api.notification.onSend.useSubscription((_a = sessionStore.user) === null || _a === void 0 ? void 0 : _a.id, {
        onData(data) {
            console.log("🚀 ~ file: index.tsx:37 ~ onData ~ data:", data);
            getNotificationsBySessionQuery.refetch();
        },
        onError(error) {
            console.log("🚀 ~ file: index.tsx:41 ~ onError ~ error:", error);
        },
    });
    return (<Popover.Root closeHandler={closePopoverHandler}>
      <Popover.Trigger type="button" asIcon color="default" onClick={togglePopoverHandler} isActive={isPopoverOpen}>
        <Icons_1.IconBell />
      </Popover.Trigger>
      <Popover.Wrapper isOpen={isPopoverOpen}>
        <Popover.Header>
          <Popover.Title>Уведомления</Popover.Title>
          <Popover.Actions>
            <Button_1.default type="button" asIcon title="Пометить все, как прочитанное">
              <Icons_1.IconCheckDouble />
            </Button_1.default>
            <Button_1.default asIcon type="button" color="danger" title="Удалить все" onClick={() => modalStore.open({ key: enums_1.ModalKeyMap.DeleteNotifications })}>
              <Icons_1.IconTrash />
            </Button_1.default>
          </Popover.Actions>
        </Popover.Header>
        <Popover.Content className={styles_module_sass_1.default.content}>
          {!getNotificationsBySessionQuery.isLoading ? (((_b = getNotificationsBySessionQuery.data) === null || _b === void 0 ? void 0 : _b.length) ? (<ul className={styles_module_sass_1.default.list}>
                {(_c = getNotificationsBySessionQuery.data) === null || _c === void 0 ? void 0 : _c.map((notification) => {
                var _a;
                return (<li key={notification.id}>
                    <link_1.default href={enums_1.PagePathMap.HomePage} onPointerDown={rippleEffectEvent} className={(0, func_1.cls)(styles_module_sass_1.default.item, {
                        [(_a = styles_module_sass_1.default._notReaded) !== null && _a !== void 0 ? _a : ""]: !notification.isReaded,
                    })}>
                      <div className={styles_module_sass_1.default.avatar}>
                        <UserAvatar_1.default src={notification.sender.avatar}/>
                      </div>
                      <p className={styles_module_sass_1.default.text}>
                        <strong>{notification.sender.name}</strong>
                        &nbsp;оставил-(ла) отзыв на&nbsp;
                        <strong>Лабораторная работа №1</strong>
                      </p>
                      <p className={styles_module_sass_1.default.extraInfo}>
                        <time dateTime={(0, dayjs_1.default)(notification.createdAt).toISOString()}>
                          {(0, dayjs_1.default)().to((0, dayjs_1.default)(notification.createdAt))}
                        </time>
                        <i></i>
                        <span>Менеджмент в профессиональной деятельности</span>
                      </p>
                    </link_1.default>
                  </li>);
            })}
              </ul>) : (<div className={styles_module_sass_1.default.empty}>
                <span>
                  <Icons_1.IconSolidAlarm />
                </span>
                <p>У вас пока нет уведомлений.</p>
                <p>Возвращайтесь позже.</p>
              </div>)) : (<LoadingSkeleton_1.default />)}
        </Popover.Content>
      </Popover.Wrapper>
    </Popover.Root>);
};
exports.default = PopoverNotifications;
