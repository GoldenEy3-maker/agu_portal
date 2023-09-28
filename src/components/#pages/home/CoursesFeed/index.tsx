import Image from "next/image"
import NextLink from "next/link"
import styles from "./styles.module.scss"

const COURSES_FEED_DATA = [
  {
    id: 1,
    title: "Менеджмент в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 2,
    title: "Иностранный язык в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 3,
    title: "Операционные системы и среды",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 4,
    title: "Менеджмент в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 5,
    title: "Операционные системы и среды",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",

    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 6,
    title: "Менеджмент в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 7,
    title: "Иностранный язык в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 8,
    title: "Иностранный язык в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
  {
    id: 9,
    title: "Иностранный язык в профессиональной деятельности",
    logo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi aut consequatur dolor dolorem error labore laudantium molestiae nisi, possimus quis, sit veritatis! Accusamus est minus quia ratione rerum?",
    author: "Иванов И.И",
    institute: "Колледж",
  },
]

const CoursesFeed: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {COURSES_FEED_DATA.map((data) => (
        <div key={data.id} className={styles.item}>
          <div className={styles.image}>
            <Image
              src="https://placehold.co/50x50"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.main}>
            <NextLink href="#" className={styles.title}>
              {data.title}
            </NextLink>
            <p className={styles.description}>{data.description}</p>
            <footer className={styles.footer}>
              <span>Автор: {data.author}</span>
              <span>{data.institute}</span>
            </footer>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoursesFeed
