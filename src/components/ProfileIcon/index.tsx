import { BiUser } from "react-icons/bi"
import styles from "./styles.module.scss"

const ProfileIcon: React.FC = () => {
  return (
    <span className={styles.icon}>
      <BiUser />
    </span>
  )
}

export default ProfileIcon
