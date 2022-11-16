import {Overlay, Tooltip} from "react-bootstrap";

export const INVALID_ID_MESSAGE = "ID는 영문, 숫자를 포함한 6~12글자로 구성합니다."
export const INVALID_PWD_MESSAGE = "비밀번호는 특문과 영문, 숫자로 구성된 8~20글자로 구성합니다."
export const  INVALID_NICKNAME_MESSAGE = "한글, 영문, 숫자를 포함한 4~10글자 이내로 입력해주세요"
export const INVALID_MAIL_MESSAGE = "이메일 형식으로 입력해주세요"
export const INVALID_TAG_MESSAGE = "태그 이름은 한글, 영어, 숫자를 포함한 1~5글자로 입력해주세요"
export const INVALID_TAGSIZE_MESSAGE = "태그는 최대 5개까지 부착할 수 있습니다"
export const TAG_DUPLICATE_MESSAGE = "이미 입력한 태그입니다"

export function ErrorMessage({show, setShow, message, target, place}){

    return <>
        <Overlay target={target.current} show={show} placement={"top"}>
            {(props) => (
                <Tooltip  {...props}>
                    {message}
                </Tooltip>
            )}
        </Overlay>
    </>
}