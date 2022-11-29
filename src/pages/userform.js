import My_Navbar from "../component/navbar/my_Navbar";
import Form_logo from "../component/form/form_logo";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {baseAxios} from "../utils/global/axios-config";
import {validateId, validatePassword} from "../utils/global/validate";
import {ErrorMessage, INVALID_ID_MESSAGE, INVALID_PWD_MESSAGE} from "../component/error/error-message";
import {saveTokens} from "../utils/global/token";
import FindIdModal from "../component/form/find-id-modal";
import TemporaryPasswordModal from "../component/form/temporary-password-modal";


export default function Userform({_mode}) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [showIdErrorMessage, setShowIdErrorMessage] = useState(false)
    const [showPwdErrorMessage, setShowPwdErrorMessage] = useState(false)
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [showTempPwModal, setShowTempPwModal] = useState(false);

    const handleFindIdModal = () => {
        setShowFindIdModal(true);
    }
    const handleTempPwModal = () => {
        setShowTempPwModal(true);
    }

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

    const navigate = useNavigate();

    async function login() {
        await baseAxios.post("/login",
            {
                loginId: id,
                password: pwd
            })
            .then((res) => {
                saveTokens(res.headers["access-token"], res.headers["refresh-token"])
                navigate("/")
            })
            .catch(error => {
                console.log(error)
                alert(error.response.data.errorMessage)
            })
    }

    async function signIn() {
        const response = await baseAxios.post("/signUp",
            {
                loginId: id,
                password: pwd
            }).then(() => {
            clearInput();
            alert("회원가입이 완료되었습니다.")

            navigate("/")
        }).catch(error => {
            console.log(error)
        })
        console.log(response)
    }


    return <>
        <My_Navbar></My_Navbar>
        <div className={"userform_area"}>
            <Form_logo/>
            <div className={"userform_intro_area"}>
                <div><h4>Welcome To Picture-Quiz</h4></div>
                {_mode === "login" ? (<div><span>로그인을 하여 퀴즈를 직접 만들어보세요</span></div>)
                    : null
                }
                <div><span>별도의 인증 없이도 계정을 생성할 수 있어요</span></div>

            </div>
            <div className={"userform_form_area"}>

                <input ref={target_id} onChange={changeId} id={"userform_input_id"} className={"userform_form_input"}
                       type={"text"}
                       placeholder={"로그인 아이디"}/>
                <ErrorMessage place={"right"} show={showIdErrorMessage} setShow={setShowIdErrorMessage}
                              target={target_id} message={INVALID_ID_MESSAGE}/>

                <input ref={target_pwd} onChange={changePwd} id={"userform_input_pwd"} className={"userform_form_input"}
                       type={"password"}
                       placeholder={"비밀번호"}/>
                <ErrorMessage place={"right"} setShow={setShowPwdErrorMessage} show={showPwdErrorMessage}
                              target={target_pwd} message={INVALID_PWD_MESSAGE}/>
                {_mode === "login" ?
                    <>
                        <button onClick={login} className={"userform_form_input userform_form_login_btn find_btn"}
                                role={"button"}>로그인
                        </button>
                        <Button variant={"warning"} size={"sm"} href={"/signUp"}
                                className={"userform_form_signup_move_btn"}>계정 생성</Button>
                        <div className={"userform_form_input flex-box justify-content-center userform_find_area"}>
                            <div className={" find_id_area find_btn"} onClick={handleFindIdModal}>아이디 찾기</div>
                            <span className={"userform_slicer"}>/</span>
                            <div className={"w-45 find_btn"} onClick={handleTempPwModal}>임시 비밀번호 발급</div>
                        </div>
                        <FindIdModal _show={showFindIdModal} _setShow={setShowFindIdModal}/>
                        <TemporaryPasswordModal _show={showTempPwModal} _setShow={setShowTempPwModal}/>
                    </>
                    : <button onClick={signIn} className={"userform_form_input userform_form_login_btn find_btn"}
                              role={"button"}>회원가입</button>}
                <div className={"userform_admin_info"}>
                    <h4 className={"userform_admin_info_text"}>운영자 문의 : kgh2120@gmail.com</h4>
                </div>

            </div>
        </div>
    </>
}