import Image from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import styles from "./styles.module.scss"

const NEWS_FEED = [
  {
    id: crypto.randomUUID(),
    title:
      "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
    createdAt: new Date("2023-09-23"),
  },
  {
    id: crypto.randomUUID(),
    title:
      "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
    createdAt: new Date("2023-09-22"),
  },
  {
    id: crypto.randomUUID(),
    title:
      "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
    createdAt: new Date("2023-09-21"),
  },
  {
    id: crypto.randomUUID(),
    title:
      "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
    createdAt: new Date("2023-09-20"),
  },
]

const NewsFeed: React.FC = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      {NEWS_FEED.map((item) => (
        <div className={styles.item} key={item.id}>
          <header className={styles.header}>
            <NextLink
              href="https://www.asu.ru/"
              className={styles.title}
              title={item.title}
              target="_blank"
            >
              {item.title}
            </NextLink>
          </header>
          <div className={styles.main}>
            <div className={styles.image}>
              <Image
                src="https://placehold.co/150x150"
                alt=""
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.text}>
              <p className={styles.description}>{item.description}</p>
              <footer className={styles.footer}>
                <time dateTime={item.createdAt.toISOString()}>
                  {new Intl.DateTimeFormat(router.locales, {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  }).format(item.createdAt)}
                </time>
              </footer>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewsFeed