import SliderForThree from "@layouts/sliderForThree/SliderForThree";
import { SliderType } from "../../../../types/sliderType";
import NewsCard from "@common/newsCard/NewsCard";

const NewSlider = () => {
  const data = [
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      post_img: "",
      post_date: "25.04.2024",
      post_name: "Title",
      post_text:
        "NewSNewSNewSNewS NewSNewSNewSNewS NeNewSNewSNewSNewS NewSNewSNewSewSNewSNewS NewSNewSNewSNewS NwSNewSNewSNewSNewS NewSNewSNewSNewS",
    },
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      post_img: "",
      post_date: "25.04.2024",
      post_name: "Title",
      post_text:
        "NewSNewSNewSNewS NewSNewSNewSNewS NeNewSNewSNewSNewS NewSNewSNewSewSNewSNewS NewSNewSNewSNewS NwSNewSNewSNewSNewS NewSNewSNewSNewS",
    },
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      post_img: "",
      post_date: "25.04.2024",
      post_name: "Title",
      post_text:
        "NewSNewSNewSNewS NewSNewSNewSNewS NeNewSNewSNewSNewS NewSNewSNewSewSNewSNewS NewSNewSNewSNewS NwSNewSNewSNewSNewS NewSNewSNewSNewS",
    },
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      post_img: "",
      post_date: "25.04.2024",
      post_name: "Title",
      post_text:
        "NewSNewSNewSNewS NewSNewSNewSNewS NeNewSNewSNewSNewS NewSNewSNewSewSNewSNewS NewSNewSNewSNewS NwSNewSNewSNewSNewS NewSNewSNewSNewS",
    },
  ];

  const items = data.map((news) => <NewsCard key={news.id} {...news} />);
  const title = "Новости из мира донорства";

  const dataToProvide: SliderType = {
    elems: items,
    title: title,
  };

  return <SliderForThree {...dataToProvide} />;
};

export default NewSlider;
