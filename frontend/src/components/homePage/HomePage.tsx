import AdviceSlider from "./components/AdviceSliderAPI/AdviceSliderAPI";
import AnnounceSlider from "./components/AnnounceSliderAPI/AnnounceSliderAPI";
import EventSliderAPI from "./components/EventSliderAPI/EventSliderAPI";
import NewSlider from "./components/NewSliderAPI/NewSliderAPI";
import MapOfClinics from "./components/mapOfClinics/MapOfClinics";
import styles from "./homePage.module.css";

const HomePage = () => {


  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__content}>
        <AnnounceSlider />
        <AdviceSlider />
        <NewSlider />
        <EventSliderAPI />
        <MapOfClinics />
      </div>
    </div>
  );
};

export default HomePage;
