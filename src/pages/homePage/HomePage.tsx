import Advice from "../../components/advice/Advice";
import SliderForThree from "../../sections/sliderForThree/SliderForThree";
import { AdviceType } from "../../types/AdviceType";
import styles from "./homePage.module.css";

interface adviceData {
  props: AdviceType[];
}

const HomePage = () => {
  const data = [
    {
      id: 0,
      user_id: 0,
      advice_date: "25.04.2024",
      advice_text:
        "advice advice advice advice advice adviceadviceadvice advice adviceadvice adviceadviceadvicev adviceadvice adviceadviceadvice adviceadvice adviceadvice",
      admin_accept: true,
    },
    {
      id: 1,
      user_id: 0,
      advice_date: "25.04.2024",
      advice_text:
        "ttt tttttt ttt ttt ttt ttt ttt ttt ttt ttt tttttt tttttt ttt vttt tttttt tttttt tttttt ttt ttt tttv ttt tttttt tttttt ttt",
      admin_accept: true,
    },
    {
      id: 2,
      user_id: 0,
      advice_date: "25.04.2024",
      advice_text:
        "advice advice advice advice advice adviceadviceadvice advice adviceadvice adviceadviceadvicev adviceadvice adviceadviceadvice adviceadvice adviceadvice",
      admin_accept: true,
    },
    {
      id: 3,
      user_id: 0,
      advice_date: "25.04.2024",
      advice_text:
        "advice advice advice advice advice adviceadviceadvice advice adviceadvice adviceadviceadvicev adviceadvice adviceadviceadvice adviceadvice adviceadvice",
      admin_accept: true,
    },
  ];

  const items = data.map((advice) => <Advice key={advice.id} {...advice} />);
  console.log(items);
  const title = "Советы от доноров";
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__content}>
        <SliderForThree elems={items} title={title} />
      </div>
    </div>
  );
};

export default HomePage;
