import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 20000,
});

export const fetchAnnounce = () => {
    return instance.get("/announcements");
};

export const fetchUrgency = () => {
    return instance.get("/urgency");
};

export const fetchAnnounceId = (id: any) => {
    return instance.get(`/announcement/${id}`);
};

export const fetchAnimalTypes = () => {
    return instance.get("/animaltypes");
};

export const fetchBloodTypes = (pet_type_id: any) => {
    return instance.get(`/bloodtypes/${pet_type_id}`);
};

export const postAnnounceData = (data: any) => {
    return instance.post("/createAnnounce", data);
};

export const deleteAnnounce = (id: any) => {
    return instance.delete(`/deleteAnnounce/${id}`);
};
