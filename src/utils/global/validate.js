export const validateId = (value) => {
    const pattern = "^[A-Za-z0-9]{6,12}"; // 영어, 숫자 6~12글자

    return  new RegExp(pattern).test(value);
}

export const validatePassword = (value) => {
    const pattern = "^(?=.*\\d)(?=.*[~`!@#$%\\^&()-])(?=.*[a-zA-Z]).{8,20}$"; // 특문 포함 8~20 자 영문숫자
    return validateInput(value,pattern);
}

export const validateEmail = (value) => {
    const pattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"
    return validateInput(value,pattern);
}

export const validateTagName = (value) => {
    const pattern = "^[ㄱ-ㅎㅏ-ㅣ가-힣0-9A-Za-z]{1,5}$" // 한글, 영어, 숫자 1~5글자
    return validateInput(value,pattern);
}
export const validateNickname = (value) => {
    const pattern = "^[가-힣a-zA-Z0-9]{4,10}" // 한글, 영문, 숫자 4~10자
    return validateInput(value,pattern);
}

export const validateTagsSize = (tags) => {
    return tags.length < 6;
}

const validateInput = (value, reg) => {
    return new RegExp(reg).test(value);
}

export const validateDuplicateArray = (array, value) => {

    for (const item of array) {
        if(item.name=== value)
            return true;
    }
    return false;
    }
