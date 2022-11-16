export const deleteToken = () =>{
    sessionStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token");
}

export const getAccessToken = () =>{
    return sessionStorage.getItem("access-token",)
}

export const saveTokens = (access,refresh) =>{
    sessionStorage.setItem("access-token",access);
    localStorage.setItem("refresh-token",refresh);
}