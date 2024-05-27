import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

export const fetchPosts = () => {
  return instance.get("/post");
};

export const postNewsData = (data: any) => {
  return instance.post("/createPost", data);
};

export const deleteNews = (data: any) => {
  return instance.delete(`/deletePost/${data.id}`, data);
};
