import SliderForThree from "@layouts/sliderForThree/SliderForThree";
import { SliderType } from "../../../../types/sliderType";
import EventCard from "@common/eventCard/EventCard";

const EventSliderAPI = () => {
  const data = [
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      event_title: "Title Title",
      event_date: "14.14.2114",
      event_address: "ул. Рокоссовского, д. 24",
      event_goal: "Description description description description",
    },
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      event_title: "Title Title",
      event_date: "14.14.2114",
      event_address: "ул. Рокоссовского, д. 24",
      event_goal: "Description description description description",
    },
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      event_title: "Title Title",
      event_date: "14.14.2114",
      event_address: "ул. Рокоссовского, д. 24",
      event_goal: "Description description description description",
    },
    {
      id: 0,
      admin_id: 0,
      org_id: 0,
      event_title: "Title Title",
      event_date: "14.14.2114",
      event_address: "ул. Рокоссовского, д. 24",
      event_goal: "Description description description description",
    },
  ];

  const items = data.map((news) => <EventCard key={news.id} {...news} />);
  const title = "Мероприятия";

  const dataToProvide: SliderType = {
    elems: items,
    title: title,
  };

  return <SliderForThree {...dataToProvide} />;
};

export default EventSliderAPI;
