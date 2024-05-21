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
  );
};

export default AnnouncePage;




