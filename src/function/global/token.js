export const deleteToken = () =>{
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}