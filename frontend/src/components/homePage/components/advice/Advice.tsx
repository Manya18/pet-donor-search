import { AdviceType } from "../../../../types/AdviceType";
import styles from "./advice.module.css";
import FaceIcon from "@mui/icons-material/Face";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAdvice } from "utils/adviceApi";

const Advice = ({ props }: { props: AdviceType }) => {
  if (!props.admin_accept) return null;

  const date = new Date(props.advice_date);

  const deleteAdviceFunc = () => {
    const data = {
      id: props.advice_id,
    };
    deleteAdvice(data);
    window.location.reload();
  };

  return (
    <div key={props.advice_id} className={styles.advice}>
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
      <button
        className={styles.delete__button}
        onClick={() => deleteAdviceFunc()}
        title="Удалить совет"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Advice;
