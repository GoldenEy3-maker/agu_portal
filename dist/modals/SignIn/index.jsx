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
const zod_1 = require("@hookform/resolvers/zod");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const bi_1 = require("react-icons/bi");
const Button_1 = __importDefault(require("~/components/Button"));
const Checkbox_1 = __importDefault(require("~/components/Checkbox"));
const Form = __importStar(require("~/components/Form"));
const Input_1 = __importDefault(require("~/components/Input"));
const Modal = __importStar(require("~/components/Modal"));
const autoFocus_hook_1 = require("~/hooks/autoFocus.hook");
const auth_schema_1 = require("~/server/api/schemas/auth.schema");
const modal_1 = require("~/store/modal");
const session_1 = require("~/store/session");
const api_1 = require("~/utils/api");
const enums_1 = require("~/utils/enums");
const SignInModal = () => {
    const modalStore = (0, modal_1.useModalStore)();
    const sessionStore = (0, session_1.useSessionStore)();
    const loginInputRef = (0, react_1.useRef)(null);
    const isModalOpen = modalStore.queue.at(-1) === enums_1.ModalKeyMap.SignIn;
    const closeModalHandler = () => modalStore.close();
    const signIn = api_1.api.auth.signIn.useMutation({
        onSuccess(data) {
            react_hot_toast_1.default.success("Вы успешно авторизировались!");
            sessionStore.setToken(data.accessToken);
            sessionStore.setUser(data.user);
            closeModalHandler();
            form.reset();
        },
        onError(error) {
            var _a;
            console.log("🚀 ~ file: index.tsx:39 ~ onError ~ error:", error);
            react_hot_toast_1.default.error(error.message);
            (_a = loginInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
    });
    const form = (0, react_hook_form_1.useForm)({
        defaultValues: {
            login: "",
            password: "",
            rememberMe: false,
        },
        resolver: (0, zod_1.zodResolver)(auth_schema_1.authSignInInput),
    });
    const submitFormHandler = form.handleSubmit((data) => {
        signIn.mutate(data);
    });
    (0, autoFocus_hook_1.useAutoFocus)(loginInputRef, isModalOpen);
    return (<Modal.Root state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Войти</Modal.Title>
        <Modal.Close onClick={closeModalHandler}/>
      </Modal.Header>
      <Modal.Content>
        <Form.Root id="sign-in-form" onSubmit={submitFormHandler}>
          <Form.Fieldset>
            <react_hook_form_1.Controller control={form.control} name="login" render={({ field }) => {
            var _a;
            return (<Input_1.default type="text" label="Логин" id="login" placeholder="ivanov.202s2" name={field.name} onChange={field.onChange} onBlur={field.onBlur} value={field.value} ref={loginInputRef} leadingIcon={<bi_1.BiUser />} errorMessage={(_a = form.formState.errors.login) === null || _a === void 0 ? void 0 : _a.message} disabled={signIn.isLoading}/>);
        }}/>
            <react_hook_form_1.Controller control={form.control} name="password" render={({ field }) => {
            var _a;
            return (<Input_1.default type="password" label="Пароль" id="password" placeholder="******" name={field.name} onChange={field.onChange} onBlur={field.onBlur} value={field.value} leadingIcon={<bi_1.BiLockAlt />} errorMessage={(_a = form.formState.errors.password) === null || _a === void 0 ? void 0 : _a.message} disabled={signIn.isLoading}/>);
        }}/>
          </Form.Fieldset>
          <Form.Fieldset type="checkbox">
            <react_hook_form_1.Controller control={form.control} name="rememberMe" render={({ field }) => (<Checkbox_1.default type="check" id="rememberMe" label="Запомнить меня" name={field.name} checked={field.value} onChange={field.onChange} onBlur={field.onBlur} disabled={signIn.isLoading}/>)}/>
          </Form.Fieldset>
          <link_1.default href="#" onClick={(e) => {
            e.preventDefault();
            modalStore.open({ key: enums_1.ModalKeyMap.LogOut });
        }}>
            Забыли логин или пароль?
          </link_1.default>
        </Form.Root>
      </Modal.Content>
      <Modal.Footer>
        <Button_1.default type="button" onClick={closeModalHandler} disabled={signIn.isLoading}>
          Отменить
        </Button_1.default>
        <Button_1.default type="submit" form="sign-in-form" variant="filled" disabled={signIn.isLoading}>
          Войти
        </Button_1.default>
      </Modal.Footer>
    </Modal.Root>);
};
exports.default = SignInModal;
