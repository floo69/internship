import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Update with your backend URL
});

export const getInternships = () => api.get("/internships");
export const createInternship = (data: any) => api.post("/internships", data);
export const getInternship = (id: string) => api.get(`/internships/${id}`);
export const updateInternship = (id: string, data: any) =>
  api.put(`/internships/${id}`, data);
export const deleteInternship = (id: string) =>
  api.delete(`/internships/${id}`);
