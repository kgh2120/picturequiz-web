import {baseAxios} from "./axios-config";

export const deleteToken = () =>{
    sessionStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token");
}

export const getAccessToken = () =>{
    console.log(sessionStorage.getItem("access-token"))
    return sessionStorage.getItem("access-token")
}

export const saveTokens = (access,refresh) =>{
    sessionStorage.setItem("access-token",access);
    localStorage.setItem("refresh-token",refresh);
}

export const autoLogin = () => {
    baseAxios.post("/refresh",{
        refreshToken: getAccessToken()
    }).then((res)=>{
        saveTokens(res.headers["access-token"], res.headers["refresh-token"])
    })
}