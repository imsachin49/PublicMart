import axios from "axios";
import { json } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";
const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjVhNGFlYTc5NDMyNjFkM2JiNDM1NiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI4NDg1ODEsImV4cCI6MTY3MzQ1MzM4MX0.ZWUd7r-ZZBR4gmeDGKFO--CiTjO_YG71xdkUWisyeVs'
// const token=(JSON.parse(localStorage.getItem("persist:root")));
// const token=JSON.parse(localStorage.getItem("persist:root"));

// const token=(localStorage.getItem("persist:root"));
// console.log("mytoken="+token);

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest= axios.create({
    baseURL: BASE_URL,
    headers:{ authorization: `Bearer ${TOKEN}` }
})

// Path: frontend\src\requestMethods.js
