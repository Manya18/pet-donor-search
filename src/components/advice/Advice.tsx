import logo from "../../images/vk.png"
import styles from "./advice.module.css";

const Advice = () => {
  return (
    <div className={styles.advice}>
      <div className={styles.advice__head}>
      <img className={styles.author__img} src={logo} alt="avatar"/>
        <div className={styles.advice__author}>
          <div className={styles.author__name}>Nick Jonas</div>
          <div className={styles.advice__date}>25.04.2024</div>
        </div>
      </div>
      <div className={styles.advice__text}>
        Advice advice advice advice advice advice advice advice advice advice
        advice advice advice
      </div>
    </div>
  );
};

export default Advice;
