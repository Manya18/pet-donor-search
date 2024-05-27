import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

export const fetchEvents = () => {
  return instance.get("/events");
};

export const postEventData = (data: any) => {
  return instance.post("/createEvent", data);
};

export const deleteEvent = (data: any) => {
  return instance.delete(`/deleteEvent/${data.id}`, data);
};
