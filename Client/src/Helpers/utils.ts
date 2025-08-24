import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "https://grocer-go-pi.vercel.app/api",
    withCredentials: true
})