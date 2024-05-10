import logo from "@images/logo.png";
import { AdviceType } from "../../../../types/AdviceType";
import styles from "./advice.module.css";

const Advice = (props: AdviceType) => {

  if (!props.admin_accept) return <></>;
  
  return (
    <div key={props.id} className={styles.advice}>
      <div className={styles.advice__head}>
        <img className={styles.author__img} src={logo} alt="avatar" />
        <div className={styles.advice__author}>
          <div className={styles.author__name}>{props.user_id}</div>
          <div className={styles.advice__date}>{props.advice_date}</div>
        </div>
      </div>
      <div className={styles.advice__text}>{props.advice_text}</div>
    </div>
  );
};

export default Advice;
