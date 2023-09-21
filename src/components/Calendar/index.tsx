import dayjs from "dayjs"
import { useRouter } from "next/router"
import { useMemo, useRef, useState } from "react"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { cls, toUpperInitialLetter } from "~/utils/func"
import { ValueOf } from "~/utils/types"
import Button from "../Button"
import styles from "./styles.module.scss"

const Modes = {
  Days: "days",
  Months: "months",
} as const

type Modes = ValueOf<typeof Modes>

type CalendarProps = {
  date?: Date
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const [currentDate, setCurrentDate] = useState(dayjs(props.date))
  const [selectionMode, setSelectionMode] = useState<Modes>("days")
  const [selectedDate, setSelectedDate] = useState(dayjs(props.date))

  const daysMainRef = useRef<HTMLDivElement>(null)
  const monthsGridHeightRef = useRef(0)

  const router = useRouter()

  const startCurrentMonth = currentDate.startOf("month")
  const endCurrentMonth = currentDate.endOf("month")
  const diffDaysCurrentMonth =
    endCurrentMonth.diff(startCurrentMonth, "day") + 1

  const nextMonth = currentDate.add(1, "month")
  const startNextMonth = nextMonth.startOf("month")
  const prevMonth = currentDate.subtract(1, "month")
  const endPrevMonth = prevMonth.endOf("month")

  const setMonthsGridHeight = () => {
    if (daysMainRef.current)
      monthsGridHeightRef.current =
        daysMainRef.current.getBoundingClientRect().height
  }

  const toggleSelectionMode = () => {
    if (selectionMode === "days") setMonthsGridHeight()

    setSelectionMode((prev) => (prev === "days" ? "months" : "days"))
  }

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

  const months = useMemo(() => {
    const res: dayjs.Dayjs[] = []

    for (let i = 0; i < 12; i++) {
      res.push(currentDate.startOf("year").add(i, "month"))
    }

    return res
  }, [currentDate])

  return (
    <div>
      <header className={styles.header}>
        <Button
          type="button"
          className={styles.headerCurr}
          onClick={toggleSelectionMode}
        >
          <p>
            {(() => {
              if (selectionMode === "months") return currentDate.year()

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
              <div
                className={styles.monthsGrid}
                style={
                  {
                    "--height": monthsGridHeightRef.current + "px",
                  } as React.CSSProperties
                }
              >
                {months.map((date) => (
                  <Button
                    key={date.unix()}
                    type="button"
                    variant={
                      date.isSame(dayjs(props.date), "month")
                        ? "filled"
                        : undefined
                    }
                    onClick={() => {
                      setSelectionMode("days")
                      setCurrentDate((prev) => prev.set("month", date.month()))
                    }}
                  >
                    {toUpperInitialLetter(
                      new Intl.DateTimeFormat(router.locale, {
                        month: "long",
                      }).format(date.toDate())
                    )}
                  </Button>
                ))}
              </div>
            )

          return (
            <div ref={daysMainRef}>
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
                    variant={(() => {
                      if (
                        date.isSame(selectedDate, "date") &&
                        date.month() === currentDate.month()
                      )
                        return "filled"

                      if (date.isSame(dayjs(props.date), "date"))
                        return "outliend"

                      return undefined
                    })()}
                    color={
                      date.day() === 0 && date.month() === currentDate.month()
                        ? "danger"
                        : undefined
                    }
                    className={cls([], {
                      [styles._notCurrentMonth ?? ""]:
                        date.month() !== currentDate.month(),
                    })}
                    onClick={() => {
                      setSelectedDate(date)
                      setCurrentDate((prev) => prev.set("month", date.month()))
                    }}
                  >
                    {date.date()}
                  </Button>
                ))}
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default Calendar
