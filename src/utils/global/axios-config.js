import axios from "axios";

const local = "http://localhost:8080";
const cloud = "http://ec2-3-36-253-255.ap-northeast-2.compute.amazonaws.com:8080"
const base = local;

export const baseAxios =  axios.create({
    baseURL: base,
});



export const tokenAxios = axios.create({
    baseURL: base,
    headers : {
        "Authorization" : `Bearer ${sessionStorage.getItem("access-token")}`
    }
})