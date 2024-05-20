
import styles from "./AnnouncementDetails.module.css"
import Header from "components/common/header/Header";
import Announce from "components/announcePage/components/AnnouncementDetails";
import Footer from "components/common/footer/Footer";

const AnnouncementDetails = () => {
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

export default AnnouncementDetails;




