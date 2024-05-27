import styles from "./newsCard.module.css";
import { NewsType } from "../../../types/NewsType";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteNews } from "utils/postApi";

const NewsCard = ({ props }: { props: NewsType }) => {
  const date = new Date(props.post_date);
  const deleteNewsFunc = () => {
    const data = {
      id: props.id,
    };
    deleteNews(data);
    window.location.reload();
  };

  return (
    <div key={props.id} className={styles.newsCard}>
      <div className={styles.img__wrapper}>
        <img className={styles.news__img} src={props.post_link} alt="news" />
      </div>
      <div className={styles.news__text__wrapper}>
        <div className={styles.news__title}>{props.post_name}</div>
        <div className={styles.news__date}>{date.toLocaleDateString()}</div>
        <div className={styles.news__text}>{props.post_text}</div>
      </div>
      <button
        className={styles.delete__button}
        onClick={() => deleteNewsFunc()}
        title="Удалить новость"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default NewsCard;
