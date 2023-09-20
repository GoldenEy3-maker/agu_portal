import dayjs from "dayjs"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { cls, toUpperInitialLetter } from "~/utils/func"
import { ValueOf } from "~/utils/types"
import Button from "../Button"
import styles from "./styles.module.scss"

const Modes = {
  Days: "days",
  Months: "months",
  Years: "years",
} as const

type Modes = ValueOf<typeof Modes>

type CalendarProps = {
  date?: Date
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const [currentDate, setCurrentDate] = useState(dayjs(props.date) || dayjs())
  const [selectionMode, setSelectionMode] = useState<Modes>("days")

  const router = useRouter()

  const startCurrentMonth = currentDate.startOf("month")
  const endCurrentMonth = currentDate.endOf("month")
  const diffDaysCurrentMonth =
    endCurrentMonth.diff(startCurrentMonth, "day") + 1

  const nextMonth = currentDate.add(1, "month")
  const startNextMonth = nextMonth.startOf("month")
  const prevMonth = currentDate.subtract(1, "month")
  const endPrevMonth = prevMonth.endOf("month")

  const days = useMemo(() => {
    const res: dayjs.Dayjs[] = []
    let weekDayStartCurrentMonth = startCurrentMonth.day() - 1
    let weekDayEndCurrentMonth = 7 - endCurrentMonth.day()
    let isNotFull = true
    let suffixCount = 0

    if (weekDayStartCurrentMonth === 0) weekDayStartCurrentMonth = 0
    if (weekDayStartCurrentMonth < 0) weekDayStartCurrentMonth = 6

    let prefixCount =
      endPrevMonth.date() - (endPrevMonth.date() - weekDayStartCurrentMonth + 1)

    if (startCurrentMonth.day() === 6 && diffDaysCurrentMonth >= 30)
      isNotFull = false

    if (startCurrentMonth.day() === 0 && diffDaysCurrentMonth >= 30)
      isNotFull = false

    if (startCurrentMonth.day() === 5 && diffDaysCurrentMonth === 31)
      isNotFull = false

    for (
      let i = endPrevMonth.date() - weekDayStartCurrentMonth + 1;
      i <= endPrevMonth.date();
      i++
    ) {
      res.push(endPrevMonth.subtract(prefixCount, "day"))
      prefixCount--
    }

    for (let i = startCurrentMonth.date(); i <= endCurrentMonth.date(); i++) {
      res.push(startCurrentMonth.add(i - 1, "day"))
    }

    for (
      let i = startNextMonth.date();
      i < startNextMonth.date() + weekDayEndCurrentMonth + (isNotFull ? 7 : 0);
      i++
    ) {
      res.push(startNextMonth.add(suffixCount, "day"))
      suffixCount++
    }

    return res
  }, [currentDate])

  return (
    <div>
      <header className={styles.header}>
        <Button
          type="button"
          className={styles.headerCurr}
          onClick={() =>
            selectionMode === "days"
              ? setSelectionMode("months")
              : setSelectionMode("years")
          }
        >
          <p>
            {(() => {
              if (selectionMode === "months") return currentDate.year()

              if (selectionMode === "years") return "2020-2024"

              return toUpperInitialLetter(
                new Intl.DateTimeFormat(router.locale, {
                  month: "long",
                  year: "numeric",
                }).format(currentDate.toDate())
              )
            })()}
          </p>
        </Button>
        <div className={styles.headerActions}>
          <Button
            asIcon
            type="button"
            onClick={() => {
              if (selectionMode === "months")
                return setCurrentDate((prev) => prev.subtract(1, "year"))
              setCurrentDate((prev) => prev.subtract(1, "month"))
            }}
          >
            <BiLeftArrowAlt />
          </Button>
          <Button
            asIcon
            type="button"
            onClick={() => {
              if (selectionMode === "months")
                return setCurrentDate((prev) => prev.add(1, "year"))
              setCurrentDate((prev) => prev.add(1, "month"))
            }}
          >
            <BiRightArrowAlt />
          </Button>
        </div>
      </header>
      <div className={styles.main}>
        {(() => {
          if (selectionMode === "months")
            return (
              <div className={styles.monthsGrid}>
                <Button>Январь</Button>
                <Button>Февраль</Button>
                <Button>Март</Button>
                <Button>Апрель</Button>
                <Button>Май</Button>
                <Button>Июнь</Button>
                <Button>Июль</Button>
                <Button>Август</Button>
                <Button>Сентябрь</Button>
                <Button>Октябрь</Button>
                <Button>Ноябрь</Button>
                <Button>Декабрь</Button>
              </div>
            )

          return (
            <>
              <div className={styles.weeks}>
                <span>Пн</span>
                <span>Вт</span>
                <span>Ср</span>
                <span>Чт</span>
                <span>Пт</span>
                <span>Сб</span>
                <span>Вс</span>
              </div>
              <div className={styles.daysGrid}>
                {days.map((date) => (
                  <Button
                    key={date.unix()}
                    asIcon
                    type="button"
                    className={cls([], {
                      [styles._notCurrentMonth ?? ""]:
                        date.month() !== currentDate.month(),
                      [styles._currentDay ?? ""]: date.isSame(dayjs(), "date"),
                    })}
                  >
                    {date.date()}
                  </Button>
                ))}
              </div>
            </>
          )
        })()}
      </div>
    </div>
  )
}

export default Calendar
