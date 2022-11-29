export const SERVER_CONNECTION_ERROR = {
    errorMessage: "Network Error",
    responseMessage : "현재 서비스에 오류가 발생하여 작동이 원할하지 않습니다.\n운영자 이메일(kgh2120@gmail.com)으로 문의주시면 빠르게 해결하겠습니다.",
    response() {
        alert(this.responseMessage)
    }
}
