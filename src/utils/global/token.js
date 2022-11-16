export const deleteToken = () =>{
    localStorage.clear();
}
export const isLogined = () => localStorage.getItem("access-token");