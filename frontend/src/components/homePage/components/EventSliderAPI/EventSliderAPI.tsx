import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import EventCard from "../../../common/eventCard/EventCard";
import { useState, useEffect } from "react";
import { EventType } from "../../../../types/EventType";
import { fetchEvents } from "../../../../utils/eventApi";

const EventSliderAPI = () => {
  const [data, setData] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchEvents();
        console.log(response.data)
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Events:", error);
        setError("Ошибка при загрузке Events");
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

  const items = data.map((event) => <EventCard key={event.id} props={event} />);
  const title = "Мероприятия";
  const section="event"

  return <SliderForThree elems={items} title={title} sectionName={section}/>;
};

export default EventSliderAPI;
