import axios from "axios";

export const http = axios.create({
    baseURL: 'https://647f7dcdc246f166da90d6e5.mockapi.io/'
})