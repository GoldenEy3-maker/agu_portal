import Image from "next/image"
import { BiRightArrowAlt } from "react-icons/bi"
import WelcomeAguPic from "~/assets/preview_alt.jpg"
import Link from "~/components/Link"
import styles from "./styles.module.scss"

const Welcome: React.FC = () => {
  return (
    <section className={styles.welcome}>
      <h3 className={styles.title}>
        Добро пожаловать на образовательный портал!
      </h3>
      <div className={styles.wrapper}>
        <Image
          src={WelcomeAguPic}
          alt=""
          blurDataURL={WelcomeAguPic.blurDataURL}
          fill
          objectFit="cover"
        />
        <div className={styles.overlay}>
          <h2>Алтайский государственный университет (АлтГУ)</h2>
          <p>
            — высшее учебное заведение, классический университет в Алтайском
            крае РФ. Образован сразу как классический университет в 1973 году.
            Ведёт учебную, научную и культурно-просветительскую деятельность.
            Расположен в Барнауле с филиалами в городах и сёлах края. В апреле
            2017 года стал одним из региональных опорных университетов. В
            декабре 2017 года распоряжением Минобрнауки РФ признан
            университетским центром инновационного, технологического и
            социального развития.
          </p>
          <Link variant="filled" href="https://www.asu.ru/" target="_blank">
            Перейти на сайт
            <BiRightArrowAlt />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Welcome
