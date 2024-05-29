import styles from "./AnnouncementDetails.module.css"
import Header from "components/common/header/Header";
import Announce from "components/announcePage/components/announcement/AnnouncementId";
import Footer from "components/common/footer/Footer";

const AnnouncementId = () => {
    return (
        <div className={styles.AnnouncementDetails}>
            <div className={styles.content}>
                <Header />
                <Announce />
            </div>
            <Footer />
        </div>
    );
};

export default AnnouncementId;




