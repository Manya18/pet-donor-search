import styles from "./announcePage.module.css"

const AnnouncePage = () => {
  return (
    <div className={styles.AnnouncePage}>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A9d264997fa1aa9b6dbea0837d67cd50e0c0946ee898a5975977e258aef87f142&amp;source=constructor"
        width="962"
        height="432"
        frameBorder="0"
      ></iframe>{" "}
    </div>
  );
};

export default AnnouncePage;
