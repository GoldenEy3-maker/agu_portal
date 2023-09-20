import dayjs from "dayjs"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { toUpperInitialLetter } from "~/utils/func"
import Button from "../Button"
import styles from "./styles.module.scss"

type CalendarProps = {
  date?: Date
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const router = useRouter()
  const currentDate = props.date || new Date()

  const startCurrentMonth = dayjs(currentDate).startOf("month")
  const endCurrentMonth = dayjs(currentDate).endOf("month")
  const diffDaysCurrentMonth =
    endCurrentMonth.diff(startCurrentMonth, "day") + 1

  const nextMonth = dayjs(currentDate).add(1, "month")
  const startNextMonth = nextMonth.startOf("month")
  const prevMonth = dayjs(currentDate).subtract(1, "month")
  const endPrevMonth = prevMonth.endOf("month")

  const prefix = useMemo(() => {
    let weekDayStartCurrentMonth = startCurrentMonth.day() - 1

    if (weekDayStartCurrentMonth === 0) weekDayStartCurrentMonth = 0
    if (weekDayStartCurrentMonth < 0) weekDayStartCurrentMonth = 6

    const res: dayjs.Dayjs[] = []
    let count =
      endPrevMonth.date() - (endPrevMonth.date() - weekDayStartCurrentMonth + 1)

    for (
      let i = endPrevMonth.date() - weekDayStartCurrentMonth + 1;
      i <= endPrevMonth.date();
      i++
    ) {
      res.push(endPrevMonth.subtract(count, "day"))
      count--
    }

    return res
  }, [])

  const current = useMemo(() => {
    const res: dayjs.Dayjs[] = []

    for (let i = startCurrentMonth.date(); i <= endCurrentMonth.date(); i++) {
      res.push(startCurrentMonth.add(i - 1, "day"))
    }

    return res
  }, [])

  const suffix = useMemo(() => {
    let weekDayEndCurrentMonth = 7 - endCurrentMonth.day()
    let isNotFull = true

    if (startCurrentMonth.day() === 6 && diffDaysCurrentMonth >= 30)
      isNotFull = false

    if (startCurrentMonth.day() === 0 && diffDaysCurrentMonth >= 30)
      isNotFull = false

    if (startCurrentMonth.day() === 5 && diffDaysCurrentMonth === 31)
      isNotFull = false

    const res: dayjs.Dayjs[] = []
    let count = 0

    for (
      let i = startNextMonth.date();
      i < startNextMonth.date() + weekDayEndCurrentMonth + (isNotFull ? 7 : 0);
      i++
    ) {
      res.push(startNextMonth.add(count, "day"))
      count++
    }

    return res
  }, [])

  return (
    <div>
      <header className={styles.header}>
        <Button type="button" className={styles.headerCurr}>
          {toUpperInitialLetter(
            new Intl.DateTimeFormat(router.locale, {
              month: "long",
              year: "numeric",
            }).format(currentDate)
          )}
        </Button>
        <div className={styles.headerActions}>
          <Button asIcon type="button">
            <BiLeftArrowAlt />
          </Button>
          <Button asIcon type="button">
            <BiRightArrowAlt />
          </Button>
        </div>
      </header>
      <div className={styles.grid}>
        <span>Пн</span>
        <span>Вт</span>
        <span>Ср</span>
        <span>Чт</span>
        <span>Пт</span>
        <span>Сб</span>
        <span>Вс</span>
        {prefix.map((date) => (
          <Button
            key={date.date()}
            asIcon
            type="button"
            className={styles._notCurrentMonth}
          >
            {date.date()}
          </Button>
        ))}
        {current.map((date) => (
          <Button key={date.date()} asIcon type="button">
            {date.date()}
          </Button>
        ))}
        {suffix.map((date) => (
          <Button
            key={date.date()}
            type="button"
            asIcon
            className={styles._notCurrentMonth}
          >
            {date.date()}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Calendar
