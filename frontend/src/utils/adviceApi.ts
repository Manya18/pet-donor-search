import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

export const fetchAdvices = () => {
  return instance.get("/Advice");
};

// export const postSomeData = (data) => {
//   return instance.post('/some-endpoint', data);
// };