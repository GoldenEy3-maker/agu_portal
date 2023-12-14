import styles from "./styles.module.sass"

const LoadingIcon: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.rightSide}>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.bar}></div>
      </div>
    </div>
  )
}

export default LoadingIcon
