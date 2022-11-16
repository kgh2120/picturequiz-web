const color = (message, loop)=>{
    for (let i = 0; i < loop; i++) {
        message = "0"+message;
    }
    return message;
}
export const getRandomColor  = () => {
    let message = Math.floor(Math.random() * 16777215).toString(16);
    message = message.length < 6 ? color(message,6-message.length)  : message;
    return "#" + message;
}