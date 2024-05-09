import AdviceSlider from "../../components/sliders/AdviceSliderAPI/AdviceSliderAPI";
import EventSliderAPI from "../../components/sliders/EventSliderAPI/EventSliderAPI";
import NewSlider from "../../components/sliders/NewSliderAPI/NewSliderAPI";
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
