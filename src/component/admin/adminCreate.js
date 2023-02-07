import Form_logo from "../form/form_logo";
import {ErrorMessage, INVALID_ID_MESSAGE, INVALID_PWD_MESSAGE} from "../error/error-message";
import {Button} from "react-bootstrap";
import {nav_home, nav_signup} from "../../utils/global/url";
import FindIdModal from "../form/find-id-modal";
import TemporaryPasswordModal from "../form/temporary-password-modal";
import {useRef, useState} from "react";
import {validateId, validatePassword} from "../../utils/global/validate";
import {useNavigate} from "react-router-dom";
import {baseAxios, tokenAxios} from "../../utils/global/axios-config";
import {saveTokens} from "../../utils/global/token";
import {handleError} from "../../utils/global/exception/global-exception-handler";
import {ADMIN_MODE} from "../../utils/constants";

export default function AdminCreate({_setMode}) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [showIdErrorMessage, setShowIdErrorMessage] = useState(false)
    const [showPwdErrorMessage, setShowPwdErrorMessage] = useState(false)


    const target_id = useRef(null)
    const target_pwd = useRef(null)

    function changeId(event) {
        setId(event.target.value)
        setShowIdErrorMessage(!validateId(event.target.value));
        if (!validateId(event.target.value)) {
            setTimeout(() => setShowIdErrorMessage(false), 1000);
        }
    }

    function changePwd(event) {
        setPwd(event.target.value)
        setShowPwdErrorMessage(!validatePassword(event.target.value));
        if (!validatePassword(event.target.value)) {
            setTimeout(() => setShowPwdErrorMessage(false), 1000);
        }
    }

    function clearInput() {
        setId("");
        setPwd("");
    }


    async function signIn() {
        if (validatePassword(pwd) && validateId(id)) {
            tokenAxios.get(`/user/id?id=${id}`)
                .then(() => {
                    tokenAxios.post("/admin",
                        {
                            loginId: id,
                            password: pwd
                        }).then(() => {
                        // clearInput();
                        alert("관리자 계정이 생성되었습니다.")
                        _setMode(ADMIN_MODE.ADMIN_LIST);
                    }).catch(error => {
                        handleError(error);
                    })
                }).catch(err => {
                handleError(err)
            })
        } else {
            alert("입력하신 ID, 비밀번호를 확인해주세요")
        }
    }

    return (
        <>

            <div className={"font flex-box justify-content-center align-items-center h-100 flex-column"}>
                <div className={"admin_create_title"}>
                    관리자 계정 생성
                </div>
            <div className={"userform_area"}>
                <div className={"userform_form_area"}>
                    <input ref={target_id} onChange={changeId} id={"userform_input_id"}
                           className={"userform_form_input"}
                           type={"text"}
                           placeholder={"관리자 아이디"}/>
                    <ErrorMessage place={"right"} show={showIdErrorMessage} setShow={setShowIdErrorMessage}
                                  target={target_id} message={INVALID_ID_MESSAGE}/>

                    <input ref={target_pwd} onChange={changePwd} id={"userform_input_pwd"}
                           className={"userform_form_input"}
                           type={"password"}
                           placeholder={"비밀번호"}/>
                    <ErrorMessage place={"right"} setShow={setShowPwdErrorMessage} show={showPwdErrorMessage}
                                  target={target_pwd} message={INVALID_PWD_MESSAGE}/>
                    <button onClick={signIn} className={"userform_form_input userform_form_login_btn find_btn admin_create_btn"}
                            role={"button"}>관리자 계정 생성
                    </button>
                </div>
            </div>
            </div>
        </>
    )


}