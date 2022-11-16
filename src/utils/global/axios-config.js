import axios from "axios";
import {getAccessToken} from "./token";


export const baseAxios =  axios.create({
    baseURL: 'http://localhost:8080',
});



export const tokenAxios = axios.create({
    baseURL: 'http://localhost:8080',
    headers : {
        "Authorization" : `Bearer ${getAccessToken()}`
    }
})