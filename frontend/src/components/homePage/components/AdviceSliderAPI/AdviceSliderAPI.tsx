import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import Advice from "../advice/Advice";
import { fetchAdvices } from "../../../../utils/adviceApi";
import { useEffect, useState } from "react";
import { AdviceType } from "../../../../types/AdviceType";

const AdviceSlider = () => {
  const [data, setData] = useState<AdviceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

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
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const items = data.map((advice) => <Advice key={advice.id} props={advice} />);
  const title = "Советы от доноров";
  const section = "advice";

  return <SliderForThree elems={items} title={title} sectionName={section}/>;
};

export default AdviceSlider;
