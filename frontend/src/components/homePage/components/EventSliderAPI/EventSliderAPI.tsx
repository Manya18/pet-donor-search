import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import EventCard from "../../../common/eventCard/EventCard";
import { useState, useEffect } from "react";
import { EventType } from "../../../../types/EventType";
import { fetchEvents, postEventData } from "../../../../utils/eventApi";

const EventSliderAPI = () => {
  const [data, setData] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [eventAddress, setEventAddress] = useState("");
  const [eventGoal, setEventGoal] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("2018-06-12T19:30");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchEvents();
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

  const createEvent = () => {
    const eventData = {
      admin_id: 3,
      event_date: eventDate,
      address: eventAddress,
      goal: eventGoal,
      org_id: 2,
      title: eventTitle,
    };

    postEventData(eventData)
      .then((res) => {
        console.log("Мероприятие успешно создано:", res.data);
      })
      .catch((error) => {
        console.error("Ошибка при создании мероприятия:", error);
      });
    window.location.reload();
  };

  const modalContent = (
    <div style={{ maxWidth: "500px" }}>
      <h2>Создать мероприятие</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Название мероприятия
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => {
              setEventTitle(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Цель мероприятия
          <input
            type="text"
            value={eventGoal}
            onChange={(e) => {
              setEventGoal(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Дата проведения мероприятия
          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => {
              setEventDate(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Место проведения мероприятия
          <input
            type="text"
            value={eventAddress}
            onChange={(e) => {
              setEventAddress(e.target.value);
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
          onClick={() => createEvent()}
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

  const items = data.map((event) => <EventCard key={event.id} props={event} />);
  const title = "Мероприятия";
  const section = "event";
  const buttonText = "Создать мероприятие";

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

export default EventSliderAPI;
