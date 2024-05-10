import { EventType } from "../../../types/EventType";
import styles from "./eventCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import Diversity1Icon from "@mui/icons-material/Diversity1";

const EventCard = (props: EventType) => {
  //TODO: добавить разбитие датывремени на дату и время
  return (
    <div key={props.id} className={styles.event__card}>
      <div className={styles.event__datestamp}>
        <div className={styles.event__date}>{props.event_date}</div>
        <div className={styles.event__time}>{props.event_date}</div>
      </div>
      <hr />
      <div className={styles.event_content}>
        <div className={styles.event__title}>Title</div>
        <div className={styles.event__goal}>
          Description description description description
        </div>
        <div className={styles.event__location}>
          <Diversity1Icon />
          <div className={styles.event__org}>OOO "TypeScript"</div>
        </div>
        <div className={styles.event__location}>
          <PlaceIcon />
          <div className={styles.event__address}>ул. Рокоссовского, д. 24</div>
        </div>
      </div>
      <button className={styles.event__signup}>Записаться</button>
    </div>
  );
};

export default EventCard;
