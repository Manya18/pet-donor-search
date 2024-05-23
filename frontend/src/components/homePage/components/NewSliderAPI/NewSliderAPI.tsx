import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import NewsCard from "../../../common/newsCard/NewsCard";
import { NewsType } from "../../../../types/NewsType";
import { useState, useEffect } from "react";
import { fetchPosts } from "../../../../utils/postApi";

const NewSlider = () => {
  const [data, setData] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPosts();
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Posts:", error);
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

  const items = data.map((news) => <NewsCard key={news.id} props={news} />);
  const title = "Новости из мира донорства";
  const section = "new";

  return <SliderForThree elems={items} title={title} sectionName={section} />;
};

export default NewSlider;
