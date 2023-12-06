"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const router_1 = require("next/router");
const react_1 = require("react");
const func_1 = require("~/utils/func");
const Button_1 = __importDefault(require("../Button"));
const Icons_1 = require("../Icons");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Calendar = (props) => {
    const [currentDate, setCurrentDate] = (0, react_1.useState)((0, dayjs_1.default)(props.date));
    const [selectedDate, setSelectedDate] = (0, react_1.useState)((0, dayjs_1.default)(props.date));
    const daysMainRef = (0, react_1.useRef)(null);
    const router = (0, router_1.useRouter)();
    const startCurrentMonth = currentDate.startOf("month");
    const endCurrentMonth = currentDate.endOf("month");
    const daysCurrentMonth = endCurrentMonth.diff(startCurrentMonth, "day") + 1;
    const nextMonth = currentDate.add(1, "month");
    const startNextMonth = nextMonth.startOf("month");
    const prevMonth = currentDate.subtract(1, "month");
    const endPrevMonth = prevMonth.endOf("month");
    const days = (0, react_1.useMemo)(() => {
        let weekDayStartCurrentMonth = startCurrentMonth.day() - 1;
        if (weekDayStartCurrentMonth < 0)
            weekDayStartCurrentMonth = 6;
        const res = [];
        const weekDayEndCurrentMonth = 7 - endCurrentMonth.day();
        const startPrefixDate = endPrevMonth.date() - (weekDayStartCurrentMonth - 1);
        let prefixCount = endPrevMonth.date() - startPrefixDate;
        let suffixCount = 0;
        let isNotFilled = true;
        if (((startCurrentMonth.day() === 6 || startCurrentMonth.day() === 0) &&
            daysCurrentMonth >= 30) ||
            (startCurrentMonth.day() === 5 && daysCurrentMonth === 31))
            isNotFilled = false;
        for (let i = startPrefixDate; i <= endPrevMonth.date(); i++) {
            res.push(endPrevMonth.subtract(prefixCount, "day"));
            prefixCount--;
        }
        for (let i = startCurrentMonth.date(); i <= endCurrentMonth.date(); i++) {
            res.push(startCurrentMonth.add(i - 1, "day"));
        }
        for (let i = startNextMonth.date(); i <
            startNextMonth.date() + weekDayEndCurrentMonth + (isNotFilled ? 7 : 0); i++) {
            res.push(startNextMonth.add(suffixCount, "day"));
            suffixCount++;
        }
        return res;
    }, [currentDate]);
    const goToPrevDate = () => {
        setCurrentDate((prev) => prev.subtract(1, "month"));
    };
    const goToNextDate = () => {
        setCurrentDate((prev) => prev.add(1, "month"));
    };
    const getDayButtonsVariant = (day) => {
        if (day.isSame(selectedDate, "date") && day.month() === currentDate.month())
            return "filled";
        if (day.isSame((0, dayjs_1.default)(props.date), "date"))
            return "outlined";
        return undefined;
    };
    const getDayButtonsColor = (day) => {
        if (day.day() === 0 && day.month() === currentDate.month()) {
            return "danger";
        }
        return "primary";
    };
    const selectDay = (day) => {
        setSelectedDate(day);
        setCurrentDate((prev) => prev.set("month", day.month()));
    };
    return (<div>
      <header className={styles_module_sass_1.default.header}>
        <span className={styles_module_sass_1.default.headerCurr}>
          {(0, func_1.toUpperCaseInitialLetter)(new Intl.DateTimeFormat(router.locale, { month: "long" }).format(currentDate.toDate())) +
            " " +
            currentDate.year()}
        </span>
        <div className={styles_module_sass_1.default.headerActions}>
          <Button_1.default asIcon type="button" onClick={goToPrevDate} title="Предыдущий месяц">
            <Icons_1.IconLeftArrowAlt />
          </Button_1.default>
          <Button_1.default asIcon type="button" onClick={goToNextDate} title="Следующий месяц">
            <Icons_1.IconRightArrowAlt />
          </Button_1.default>
        </div>
      </header>
      <div className={styles_module_sass_1.default.main}>
        <div ref={daysMainRef}>
          <div className={styles_module_sass_1.default.weeks}>
            <span>Пн</span>
            <span>Вт</span>
            <span>Ср</span>
            <span>Чт</span>
            <span>Пт</span>
            <span>Сб</span>
            <span>Вс</span>
          </div>
          <div className={styles_module_sass_1.default.daysGrid}>
            {days.map((day) => {
            var _a;
            return (<Button_1.default key={day.unix()} asIcon type="button" variant={getDayButtonsVariant(day)} color={getDayButtonsColor(day)} className={(0, func_1.cls)({
                    [(_a = styles_module_sass_1.default._notCurrentMonth) !== null && _a !== void 0 ? _a : ""]: day.month() !== currentDate.month(),
                })} onClick={() => selectDay(day)}>
                {day.date()}
              </Button_1.default>);
        })}
          </div>
        </div>
      </div>
    </div>);
};
exports.default = Calendar;
