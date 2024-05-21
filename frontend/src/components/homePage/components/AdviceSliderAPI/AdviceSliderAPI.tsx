import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import { SliderType } from "../../../../types/sliderType";
import Advice from "../advice/Advice";
import { fetchAdvises } from "../../../../utils/adviseApi";
import { useEffect, useState } from "react";

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
  console.log("asas");
  const [dataSl, setDataSl] = useState([]);

  useEffect(() => {
    fetchAdvises()
      .then((response) => {
        console.log("Fetched advises:", response.data); // Лог ответа сервера
        setDataSl(response.data); // Предполагаем, что данные находятся в response.data
      })
      .catch((error) => {
        console.error("Error fetching advises:", error); // Лог ошибки
      });
  }, []);
  
  const items = data.map((advice) => <Advice key={advice.id} {...advice} />);
  const title = "Советы от доноров";

  const dataToProvide: SliderType = {
    elems: items,
    title: title,
  };

  return <SliderForThree {...dataToProvide} />;
};

export default AdviceSlider;
