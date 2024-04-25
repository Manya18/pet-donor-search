import Advice from "../../components/advice/Advice";
import AdviceSlider from "../../sections/adviceSlider/AdviceSlider";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__content}>
        <AdviceSlider/>
      </div>
    </div>
  );
};

export default HomePage;
