import axios from "axios";

const BASE_URL = "https://full-stack-ecommerce-mu.vercel.app/api";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.user);

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest= axios.create({
    baseURL: BASE_URL,
    headers:{ authorization: `Bearer ${TOKEN}` }
})
