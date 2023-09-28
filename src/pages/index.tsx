import {
  BiCalendar,
  BiChevronRight,
  BiFolder,
  BiNews,
  BiRadar,
  BiRightArrowAlt,
} from "react-icons/bi"
import CoursesFeed from "~/components/#pages/home/CoursesFeed"
import NewsFeed from "~/components/#pages/home/NewsFeed"
import Welcome from "~/components/#pages/home/Welcome"
import Calendar from "~/components/Calendar"
import Link from "~/components/Link"
import * as Section from "~/components/Section"
import MainLayout from "~/layouts/main"
import { PagePaths } from "~/utils/enums"
import { NextPageWithLayout } from "./_app"
import styles from "./styles.module.scss"

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <main className={styles.main}>
        <Welcome />
        <Section.Group>
          <Section.Root>
            <Section.Header>
              <Section.Title>
                <BiFolder /> Курсы
              </Section.Title>
              <Link href={PagePaths.CoursesPage} variant="elevated" size="sm">
                Посмотреть все <BiRightArrowAlt />
              </Link>
            </Section.Header>
            <Section.Content>
              <CoursesFeed />
            </Section.Content>
          </Section.Root>
          <Section.Root>
            <Section.Header>
              <Section.Title>
                <BiNews /> Новости
              </Section.Title>
              <Link
                variant="elevated"
                size="sm"
                href="https://www.asu.ru/news/"
                target="_blank"
              >
                Посмотреть все
                <BiRightArrowAlt />
              </Link>
            </Section.Header>
            <Section.Content>
              <NewsFeed />
            </Section.Content>
          </Section.Root>
          <Section.Group directions="vertical" className={styles.insideGroup}>
            <Section.Root>
              <Section.Header>
                <Section.Title>
                  <BiCalendar /> Календарь
                </Section.Title>
              </Section.Header>
              <Section.Content>
                <Calendar />
              </Section.Content>
            </Section.Root>
            <Section.Root>
              <Section.Header>
                <Section.Title>Не знаешь с чего начать?</Section.Title>
              </Section.Header>
              <Section.Content>
                <iframe
                  className={styles.videoFrame}
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/j70dL0JZXGI?si=S8Gad7Il1421X1mJ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Section.Content>
            </Section.Root>
          </Section.Group>
        </Section.Group>
      </main>
    </>
  )
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
