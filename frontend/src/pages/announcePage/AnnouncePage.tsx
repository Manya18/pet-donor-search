import styles from "./announcePage.module.css"
import Header from "components/common/header/Header";
import Announce from "components/announcePage/AnnouncePage";
import Footer from "components/common/footer/Footer";

const AnnouncePage = () => {
  return (
    <div className={styles.AnnouncePage}>
      <div className={styles.content}>
        <Header />
        <Announce />
      </div>
      <Footer />
    </div>

    //   <iframe
    //     src="https://yandex.ru/map-widget/v1/?um=constructor%3A9d264997fa1aa9b6dbea0837d67cd50e0c0946ee898a5975977e258aef87f142&amp;source=constructor"
    //     width="962"
    //     height="432"
    //     frameBorder="0"
    //   ></iframe>{" "}
  );
};

export default AnnouncePage;




