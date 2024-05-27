import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import Advice from "../advice/Advice";
import { fetchAdvices, postAdviceData } from "../../../../utils/adviceApi";
import { useEffect, useState } from "react";
import { AdviceType } from "../../../../types/AdviceType";

const AdviceSlider = () => {
  const [data, setData] = useState<AdviceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [adviceText, setAdviceText] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAdvices();
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Advices:", error);
        setError("Ошибка при загрузке советов");
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const createAdvice = () => {
    const adviceData = {
      user_id: 1,
      advice_text: adviceText,
      admin_accept: true,
    };
    postAdviceData(adviceData)
      .then((res) => {
        console.log("Совет успешно создан:", res.data);
      })
      .catch((error) => {
        console.error("Ошибка при создании новости:", error);
      });
    window.location.reload();
  };

  const modalContent = (
    <div style={{ maxWidth: "500px" }}>
      <h2>Добавить совет</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Текст поста
          <input
            type="text"
            value={adviceText}
            onChange={(e) => {
              setAdviceText(e.target.value);
            }}
          ></input>
        </label>
        <button
          style={{
            maxWidth: "100px",
            fontSize: "16px",
            backgroundColor: "var(--darkTextColor)",
            color: "white",
            padding: "5px",
            border: "none",
            borderRadius: "10px",
          }}
          onClick={() => createAdvice()}
        >
          Создать
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const items = data.map((advice) => (
    <Advice key={advice.advice_id} props={advice} />
  ));
  const title = "Советы от доноров";
  const section = "advice";
  const buttonText = "Добавить совет";

  return (
    <SliderForThree
      elems={items}
      title={title}
      sectionName={section}
      buttonText={buttonText}
      modalContent={modalContent}
    />
  );
};

export default AdviceSlider;
