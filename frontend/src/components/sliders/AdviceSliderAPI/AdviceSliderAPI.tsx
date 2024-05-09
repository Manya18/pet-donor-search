import SliderForThree from "../../../sections/sliderForThree/SliderForThree";
import { SliderType } from "../../../types/sliderType";
import Advice from "../../advice/Advice";

const AdviceSlider = () => {
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
  const title = "Советы от доноров";

  const dataToProvide: SliderType = {
    elems: items,
    title: title
  }

  return (
    <SliderForThree {...dataToProvide} />
  );
};

export default AdviceSlider;
