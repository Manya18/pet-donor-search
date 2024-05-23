import { AdviceType } from "../../../../types/AdviceType";
import styles from "./advice.module.css";
import FaceIcon from "@mui/icons-material/Face";

const Advice = ({ props }: { props: AdviceType }) => {
  if (!props.admin_accept) return null;

  const date = new Date(props.advice_date);

  return (
    <div key={props.id} className={styles.advice}>
      <div className={styles.advice__head}>
        <FaceIcon sx={{ fontSize: 50 }} />
        <div className={styles.advice__author}>
          <div className={styles.author__name}>
            {props.user_name + " " + props.user_surname}
          </div>
          <div className={styles.advice__date}>{date.toLocaleDateString()}</div>
        </div>
      </div>
      <div className={styles.advice__text}>{props.advice_text}</div>
    </div>
  );
};

export default Advice;
