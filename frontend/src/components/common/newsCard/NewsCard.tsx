import styles from "./newsCard.module.css";
import newsImg from "@images/newsImg.jpg";
import { NewsType } from "../../../types/NewsType";

const NewsCard = (props: NewsType) => {
  return (
    <div key={props.id} className={styles.newsCard}>
      <div className={styles.img__wrapper}>
        <img className={styles.news__img} src={newsImg} alt="news" />
      </div>
      <div className={styles.news__text__wrapper}>
        <div className={styles.news__title}>{props.post_name}</div>
        <div className={styles.news__date}>{props.post_date}</div>
        <div className={styles.news__text}>{props.post_text}</div>
      </div>
    </div>
  );
};

export default NewsCard;
