import axios from "axios";

const api = axios.create({
    baseURL: "https://67ef1a4ac11d5ff4bf7bca80.mockapi.io/api",
})

export default api;