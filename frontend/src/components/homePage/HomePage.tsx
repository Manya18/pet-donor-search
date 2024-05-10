import AdviceSlider from "./components/AdviceSliderAPI/AdviceSliderAPI";
import EventSliderAPI from "./components/EventSliderAPI/EventSliderAPI";
import NewSlider from "./components/NewSliderAPI/NewSliderAPI";
import styles from "./homePage.module.css";

const HomePage = () => {


  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__content}>
        <AdviceSlider />
        <NewSlider />
        <EventSliderAPI />
      </div>
    </div>
  );
};

export default HomePage;
