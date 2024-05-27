import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

export const fetchAdvices = () => {
  return instance.get("/Advice");
};

export const postAdviceData = (data: any) => {
  return instance.post("/createAdvice", data);
};

export const deleteAdvice = (data: any) => {
  return instance.delete(`/deleteAdvice/${data.id}`, data);
};
