import { EventType } from "../../../types/EventType";
import styles from "./eventCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import Diversity1Icon from "@mui/icons-material/Diversity1";

const EventCard = ({ props }: { props: EventType }) => {

  const datetime = new Date(props.event_date);
  const date = datetime.toLocaleDateString();
  const time = datetime.toLocaleTimeString();

  return (
    <div key={props.id} className={styles.event__card}>
      <div className={styles.event__datestamp}>
        <div className={styles.event__date}>{date}</div>
        <div className={styles.event__time}>{time}</div>
      </div>
      <hr />
      <div className={styles.event_content}>
        <div className={styles.event__title}>{props.title}</div>
        <div className={styles.event__goal}>
          {props.goal}
        </div>
        <div className={styles.event__location}>
          <Diversity1Icon />
          <div className={styles.event__org}>{props.organisation_name}</div>
        </div>
        <div className={styles.event__location}>
          <PlaceIcon />
          <div className={styles.event__address}>{props.address}</div>
        </div>
      </div>
      <button className={styles.event__signup}>Узнать больше</button>
    </div>
  );
};

export default EventCard;
