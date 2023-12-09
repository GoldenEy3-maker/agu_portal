"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("~/components/Button"));
const Icons_1 = require("~/components/Icons");
const modal_1 = require("~/store/modal");
const session_1 = require("~/store/session");
const api_1 = require("~/utils/api");
const enums_1 = require("~/utils/enums");
const PopoverNotifications_1 = __importDefault(require("../PopoverNotifications"));
const PopoverProfile_1 = __importDefault(require("../PopoverProfile"));
const LoadingSkeleton_1 = __importDefault(require("./LoadingSkeleton"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Actions = () => {
    const modalStore = (0, modal_1.useModalStore)();
    const sessionStore = (0, session_1.useSessionStore)();
    const getSessionQuery = api_1.api.auth.getSession.useQuery(undefined, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 2,
    });
    return (<div className={styles_module_sass_1.default.actions}>
      {!getSessionQuery.isLoading ? (sessionStore.token ? (<>
            <PopoverNotifications_1.default />
            <Button_1.default type="button" asIcon color="default" onClick={(event) => modalStore.open({
                key: enums_1.ModalKeyMap.Chat,
                target: event.currentTarget,
            })}>
              <Icons_1.IconChat />
            </Button_1.default>
            <PopoverProfile_1.default />
          </>) : (<Button_1.default className={styles_module_sass_1.default.singinButton} variant="outlined" onClick={(event) => modalStore.open({
                key: enums_1.ModalKeyMap.SignIn,
                target: event.currentTarget,
            })}>
            <Icons_1.IconUser />
            Войти
          </Button_1.default>)) : (<LoadingSkeleton_1.default />)}
    </div>);
};
exports.default = Actions;
