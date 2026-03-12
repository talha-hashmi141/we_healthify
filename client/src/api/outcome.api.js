import api from "./axios";

export const outcomeAPI = {
  list: (page = 1, limit = 20) => api.get(`/outcomes?page=${page}&limit=${limit}`),
  create: (data) => api.post("/outcomes", data),
};
