import {baseAxios} from "./axios-config";

export const deleteToken = () =>{
    sessionStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token");
}
export const getRefreshToken = () =>localStorage.getItem("refresh-token");


export const getAccessToken = () =>{
    return sessionStorage.getItem("access-token")
}

export const saveTokens = (access,refresh) =>{
    sessionStorage.setItem("access-token",access);
    localStorage.setItem("refresh-token",refresh);
}

export const autoLogin = () => {
    baseAxios.post("/refresh",{
        refreshToken: getRefreshToken()
    }).then((res)=>{
        saveTokens(res.headers["access-token"], res.headers["refresh-token"])
        window.location.reload();
    })
}