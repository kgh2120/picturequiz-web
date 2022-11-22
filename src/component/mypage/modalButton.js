import {Button, Col, Form, Modal, Overlay, Row, Tooltip} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {
    ErrorMessage,
    INVALID_MAIL_MESSAGE,
    INVALID_NICKNAME_MESSAGE,
    INVALID_PWD_MESSAGE
} from "../error/error-message";
import {validateEmail, validateNickname, validatePassword} from "../../utils/global/validate";

export default function ModalButton({mode, changeState}) {



    const [changeNicknameDisabled, setChangeNicknameDisabled] = useState(true);
    const [changePasswordDisabled, setChangePasswordDisabled] = useState(true);
    const [changeMailDisabled, setChangeMailDisabled] = useState(true);
    const [timerOps, setTimerOps] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [showNickname, setShowNickname] = useState(false);
    const [currentPwdShow, setCurrentPwdShow] = useState(false)
    const [newPwdShow, setNewPwdShow] = useState(false)
    const [checkPwdShow, setCheckPwdShow] = useState(false)
    const [checkMailShow, setCheckMailShow] = useState(false)
    const mailTarget = useRef(null);
    const currentPwdTarget = useRef(null)
    const newPwdTarget = useRef(null)
    const checkPwdTarget = useRef(null)
    const nicknameTarget = useRef(null)
    const target = useRef(null);

    useEffect(() => {
        if (timerOps) {
            const countdown = setInterval(() => {
                if (parseInt(seconds) > 0) {
                    setSeconds(parseInt(seconds) - 1);
                }
                if (parseInt(seconds) === 0) {
                    if (parseInt(minutes) === 0) {
                        clearInterval(countdown);
                        setChangeMailDisabled(true);
                    } else {
                        setMinutes(parseInt(minutes) - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
            return () => {
                clearInterval(countdown);
            }
        }

    }, [minutes, seconds]);

    function isNicknameDuplicate() {
        setTooltipShow(false)
        const newNickname = document.getElementById("input_nickname_dup").value;
        tokenAxios.get(`/my-profile/nickname?nickname=${newNickname}`, ).then(res => {
            const btn = document.getElementById("nickname_update_submit_btn");
            setTooltipShow(true)
            if (res.data === false) {
                document.getElementById("input_nickname_dup").readOnly = true;
                setChangeNicknameDisabled(false);
                setErrorMessage("사용 가능한 닉네임입니다.");
            } else {
                setErrorMessage("사용 불가능한 닉네임입니다.");
                btn.disabled = true;
            }
        })
    }

    function changeNickname() {
        const newNickname = document.getElementById("input_nickname_dup").value;
        console.log(newNickname)
        tokenAxios.patch(`/my-profile/nickname`, {
            nickname: newNickname,
        }, ).then(res => {
            console.log(res);
            changeState(newNickname)
            setChangeNicknameDisabled(true);
            handleClose();
        })
    }

    function changePassword() {
        setTooltipShow(false)
        let currentPwd = document.getElementById("input_password_current").value;
        let newPwd = document.getElementById("input_password_new").value;
        let checkPwd = document.getElementById("input_password_new_check").value;


        if (currentPwd === "" || newPwd === "" || checkPwd === "") {
            setChangePasswordDisabled(true)
            setTooltipShow(true)
            setErrorMessage("입력하지 않은 값이 있습니다.");
            return;
        }

        if (newPwd !== checkPwd) {
            setChangePasswordDisabled(true)
            setTooltipShow(true)
            setErrorMessage("비밀번호 확인이 틀렸습니다.");
            return;
        } else {
            const body = {
                currentPassword: currentPwd,
                newPassword: newPwd
            }
            tokenAxios.patch("/my-profile/password", body)
                .then(() => {
                    alert("비밀번호가 변경되었습니다.");
                    handleClosePasswordBtn()
                }).catch(err => {
                console.log(err)
                if (err.response.status === 409) {
                    setTooltipShow(true)
                    setErrorMessage(err.response.data.errorMessage);
                }
            })

        }
    }

    function sendMail() {
        const input_email = document.getElementById("input_email");
        const mailAddress = input_email.value;

        tokenAxios.post("/my-profile/send-mail", {
            email: mailAddress
        }, ).then(res => {
            document.getElementById("auth_key_area").style.display = "flex";
            setTimerOps(true);
            input_email.readOnly = true;
            setMinutes(5);
            setSeconds(0);
        })
    }

    function verifyCodeAndChangeMail() {
        setTooltipShow(false)
        const mailAddress = document.getElementById("input_email").value;

        let code = document.getElementById('input_auth_key').value;
        tokenAxios.patch("/my-profile/verify-code", {
            email: mailAddress,
            code: code
        }, ).then((res) => {
            changeState(mailAddress);
            setTimerOps(false);
            alert("인증 메일이 등록되었습니다.");
            handleCloseMailBtn();

        }).catch(err => {
            let status = err.response.status;
            const tooltip = document.querySelector(".tooltip-inner");
            console.log(tooltip)
            setTooltipShow(true)
            if (status == 409) {
                // 다시 입력해주세요 말해주기.
                setErrorMessage("인증 코드를 다시 입력해 주세요");
                return;
            }
            if (status == 404) {
                // 메일을 재전송 해주기
                setErrorMessage("코드가 만료됐습니다. 메일을 재전송 했습니다.");
                setMinutes(5);
                setSeconds(0);
                setTimerOps(true);
                sendMail()
                return;
            }

        })
    }


    let title = "";

    switch (mode) {
        case "nickname" :
            title = "닉네임";
            break
        case "mail" :
            title = "인증 메일";
            break
        case "password" :
            title = "비밀번호";
            break
    }

    const handleClosePasswordBtn = () => {
        handleClose();
        setChangePasswordDisabled(true);
        setTooltipShow(false)
    }

    const handleCloseMailBtn = () => {
        handleClose();
        setTooltipShow(false)
        setChangeMailDisabled(true);
        setTimerOps(false);
    }

    const handleCloseNicknameBtn = () => {
        handleClose();
        setTooltipShow(false)
        setChangeNicknameDisabled(true);
    }

    const handleNicknameValidate = (event)=>{
        const value = event.target.value;
        if (!validateNickname(value)) {
            setShowNickname(true);
            setTimeout(() => setShowNickname(false),1000);
        }
        }


    const checkPasswordBtnUsable = (event) => {
        let current = document.getElementById("input_password_current");
        let currentPwd = current.value;
        let newPwdInput = document.getElementById("input_password_new");
        let newPwd = newPwdInput.value;
        let checked = document.getElementById("input_password_new_check");
        let checkPwd = checked.value;

        const input = event.target;
        if (input == current) {
            setCurrentPwdShow(!validatePassword(currentPwd));
            if(!validatePassword(event.target.value)){
                setTimeout(() => setCurrentPwdShow(false),1000);
            }
        }
        if (input == newPwdInput) {
            setNewPwdShow(!validatePassword(newPwd));
            if(!validatePassword(event.target.value)){
                setTimeout(() => setNewPwdShow(false),1000);
            }
        }

        if(input == checked) {
            setCheckPwdShow(!validatePassword(checkPwd));
            if(!validatePassword(event.target.value)){
                setTimeout(() => setCheckPwdShow(false),1000);
            }
        }
        if (currentPwd === "" || newPwd === "" || checkPwd === "") {
            return;
        } else {
            setChangePasswordDisabled(false);
        }
    }

    const handleAuthBtn = () => {
        let authKey = document.getElementById("input_auth_key").value;
        if (authKey !== "") {
            setChangeMailDisabled(false);
        }

    }

    const [show, setShow] = useState(false);
    const [tooltipShow, setTooltipShow] = useState(false)
    const isValidateMailInput = (event) =>{
        const value = event.target.value
        if(!validateEmail(value)) {
            setCheckMailShow(true);
            setTimeout(() => setCheckMailShow(false),1000);
        }
}

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <>
        <Button className={"my_info_item_btn"}
                variant="primary" onClick={handleShow}>
            수정
        </Button>
        <Modal
            show={show}
            backdrop="static" // 바깥을 선택해서 모달을 끌 수 있음
            keyboard={false} // keyboard를 통해서 modal이 꺼짐
        >
            <Modal.Header>
                <Modal.Title>{title} 설정하기</Modal.Title>
            </Modal.Header>

            {
                mode === "nickname" ?
                    <>
                        <Modal.Body>
                            <Form.Label>닉네임 중복검사</Form.Label>
                            <Row>
                                <Col sm={8} className={"modal_mobile_input"}>
                                    <Form.Control
                                        type="text"
                                        placeholder="nickname"
                                        id={"input_nickname_dup"}
                                        ref={nicknameTarget}
                                        onKeyUp={handleNicknameValidate}
                                    />
                                    <ErrorMessage show={showNickname} target={nicknameTarget} message={INVALID_NICKNAME_MESSAGE} />
                                </Col>
                                <Col sm={4} className={"modal_mobile_btn"}>
                                    <Button ref={target} onClick={isNicknameDuplicate} variant={"warning"}>검사</Button>
                                    <Overlay target={target.current} show={tooltipShow} placement="bottom">
                                        {(props) => (
                                            <Tooltip id="overlay-example" {...props} >
                                                {errorMessage}
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseNicknameBtn}>
                                취소하기
                            </Button>
                            <Button onClick={changeNickname} id={"nickname_update_submit_btn"}
                                    disabled={changeNicknameDisabled}
                                    variant="warning">사용하기</Button>

                        </Modal.Footer>
                    </>
                    : null
            }

            {
                mode === "mail" ? <>
                        <Modal.Body>
                            <Form.Label>인증 메일</Form.Label>
                            <Row>
                                <Col sm={8} className={"modal_mobile_input"}>
                                    <Form.Control type="email" placeholder="이메일 주소" id={"input_email"} onKeyUp={isValidateMailInput} ref = {mailTarget}/>
                                    <ErrorMessage show={checkMailShow} target={mailTarget} message={INVALID_MAIL_MESSAGE}/>
                                </Col>
                                <Col sm={4} className={"modal_mobile_btn"}>
                                    <Button variant={"warning"} onClick={sendMail}>전송</Button>
                                </Col>
                            </Row>
                            <Row className={"mt-3"} id={"auth_key_area"} style={{display: "none"}}>
                                <Col sm={10} className={"modal_mobile_input"}>
                                    <Form.Control
                                        type={"text"} onKeyUp={handleAuthBtn}
                                        placeholder={"인증 키를 입력하세요"}
                                        id={"input_auth_key"}/></Col>
                                <Col sm={2} className={"mail_auth_box modal_mobile_btn"}>
                                    <div id={"auth_timer"}>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</div>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseMailBtn}>
                                취소하기
                            </Button>
                            <Button onClick={verifyCodeAndChangeMail} disabled={changeMailDisabled}
                                    id={"mail_update_submit_btn"} variant="warning"
                                    ref={target}>사용하기</Button>
                            <Overlay target={target.current} show={tooltipShow} placement="bottom">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props} className={"error_tooltip"}>
                                        {errorMessage}
                                    </Tooltip>
                                )}
                            </Overlay>

                        </Modal.Footer>
                    </>
                    : null
            }

            {
                mode === "password" ?
                    <>
                        <Modal.Body>
                            <Form.Label>현재 비밀번호</Form.Label>
                            <Form.Control onKeyUp={checkPasswordBtnUsable}
                                          type="password"
                                          placeholder="현재 비밀번호"
                                          id={"input_password_current"}
                                          ref={currentPwdTarget}
                            />
                            <ErrorMessage show={currentPwdShow} target={currentPwdTarget}
                                          place={"right"} message={INVALID_PWD_MESSAGE}/>
                            <Form.Label>새 비밀번호</Form.Label>
                            <Form.Control onKeyUp={checkPasswordBtnUsable}
                                          type="password"
                                          placeholder="새 비밀번호"
                                          id={"input_password_new"}
                                          ref={newPwdTarget}
                            />
                            <ErrorMessage show={newPwdShow} target={newPwdTarget}
                                          place={"right"} message={INVALID_PWD_MESSAGE}/>
                            <Form.Label>새 비밀번호 확인</Form.Label>
                            <Form.Control onKeyUp={checkPasswordBtnUsable}
                                          type="password"
                                          placeholder="새 비밀번호 확인"
                                          id={"input_password_new_check"}
                                          ref={checkPwdTarget}
                            />
                            <ErrorMessage show={checkPwdShow} target={checkPwdTarget}
                                          place={"right"} message={INVALID_PWD_MESSAGE}/>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePasswordBtn}>
                                취소하기
                            </Button>
                            <Button onClick={changePassword} id={"password_update_submit_btn"} ref={target}
                                    disabled={changePasswordDisabled} variant="warning">사용하기</Button>
                            <Overlay target={target.current} show={tooltipShow} placement="bottom">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props} className={"error_tooltip"}>
                                        {errorMessage}
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Modal.Footer>
                    </>
                    : null
            }

        </Modal></>
};


