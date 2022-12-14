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
import {handleError} from "../utils/global/exception/global-exception-handler";


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
        if(validatePassword(pwd) && validateId(id)){
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
                    handleError(error);
                })
        }else{
            alert("???????????? ID, ??????????????? ??????????????????")
        }
    }

    async function signIn() {
        if(validatePassword(pwd) && validateId(id)){

            baseAxios.get(`/user/id?id=${id}`)
                .then(() => {
                    baseAxios.post("/signUp",
                        {
                            loginId: id,
                            password: pwd
                        }).then(() => {
                        clearInput();
                        alert("??????????????? ?????????????????????.")
                        navigate("/")
                    }).catch(error => {
                        handleError(error);
                    })
                }).catch(err => {handleError(err)})
        }else{
            alert("???????????? ID, ??????????????? ??????????????????")
        }
    }


    return <>
        <My_Navbar></My_Navbar>
        <div className={"userform_area"}>
            <Form_logo/>
            <div className={"userform_intro_area"}>
                <div><h4>Welcome To Picture-Quiz</h4></div>
                {_mode === "login" ? (<div><span>???????????? ?????? ????????? ?????? ??????????????????</span></div>)
                    : null
                }
                <div><span>????????? ?????? ????????? ????????? ????????? ??? ?????????</span></div>

            </div>
            <div className={"userform_form_area"}>

                <input ref={target_id} onChange={changeId} id={"userform_input_id"} className={"userform_form_input"}
                       type={"text"}
                       placeholder={"????????? ?????????"}/>
                <ErrorMessage place={"right"} show={showIdErrorMessage} setShow={setShowIdErrorMessage}
                              target={target_id} message={INVALID_ID_MESSAGE}/>

                <input ref={target_pwd} onChange={changePwd} id={"userform_input_pwd"} className={"userform_form_input"}
                       type={"password"}
                       placeholder={"????????????"}/>
                <ErrorMessage place={"right"} setShow={setShowPwdErrorMessage} show={showPwdErrorMessage}
                              target={target_pwd} message={INVALID_PWD_MESSAGE}/>
                {_mode === "login" ?
                    <>
                        <button onClick={login} className={"userform_form_input userform_form_login_btn find_btn"}
                                role={"button"}>?????????
                        </button>
                        <Button variant={"warning"} size={"sm"} href={"/signUp"}
                                className={"userform_form_signup_move_btn"}>?????? ??????</Button>
                        <div className={"userform_form_input flex-box justify-content-center userform_find_area"}>
                            <div className={" find_id_area find_btn"} onClick={handleFindIdModal}>????????? ??????</div>
                            <span className={"userform_slicer"}>/</span>
                            <div className={"w-45 find_btn"} onClick={handleTempPwModal}>?????? ???????????? ??????</div>
                        </div>
                        <FindIdModal _show={showFindIdModal} _setShow={setShowFindIdModal}/>
                        <TemporaryPasswordModal _show={showTempPwModal} _setShow={setShowTempPwModal}/>
                    </>
                    : <button onClick={signIn} className={"userform_form_input userform_form_login_btn find_btn"}
                              role={"button"}>????????????</button>}
                <div className={"userform_admin_info"}>
                    <h4 className={"userform_admin_info_text"}>????????? ?????? : kgh2120@gmail.com</h4>
                </div>

            </div>
        </div>
    </>
}