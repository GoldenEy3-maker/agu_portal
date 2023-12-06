"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("~/layouts/main"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Button_1 = __importDefault(require("~/components/Button"));
const api_1 = require("~/utils/api");
const UsersPage = () => {
    const testSend = api_1.api.notification.testSend.useMutation({
        onSuccess() {
            react_hot_toast_1.default.success("Уведомление успешно отправлено!");
        },
        onError(error) {
            react_hot_toast_1.default.error(error.message);
        },
    });
    return (<main className="content-grid">
      <h1>Страница пользователей</h1>
      <Button_1.default type="button" variant="filled" onClick={() => testSend.mutate({
            link: "",
            subject: "",
            recipientId: "b9c9a596-ce65-4f20-a1b8-5c7ce94e8ab3",
        })}>
        Отправить
      </Button_1.default>
    </main>);
};
UsersPage.getLayout = (page) => <main_1.default>{page}</main_1.default>;
exports.default = UsersPage;
