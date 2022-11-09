import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {baseAxios} from "../../../function/global/axios-config";

export default function ModalButton({mode, changeState}) {

    const token = localStorage.getItem("access-token");

    const [disabled, setDisabled] = useState(true);
    const [timerOps,setTimerOps] = useState(false);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if(timerOps){
            const countdown = setInterval(() => {
                if (parseInt(seconds) > 0) {
                    setSeconds(parseInt(seconds) - 1);
                }
                if (parseInt(seconds) === 0) {
                    if (parseInt(minutes) === 0) {
                        clearInterval(countdown);
                        setDisabled(true);
                    } else {
                        setMinutes(parseInt(minutes) - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
            return () => {clearInterval(countdown);
            }
        }

    }, [minutes, seconds]);

    function isNicknameDuplicate() {
        const newNickname = document.getElementById("input_nickname_dup").value;
        baseAxios.get(`/my-profile/nickname?nickname=${newNickname}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            const btn = document.getElementById("nickname_update_submit_btn");
            if (res.data === false) {
                document.getElementById("input_nickname_dup").readOnly = true;
                setDisabled(false)
                alert("사용 가능한 닉네임입니다.")
            } else {
                alert("사용 불가능한 닉네임입니다.")
                btn.disabled = true;
            }
        })
    }

    function changeNickname() {
        const newNickname = document.getElementById("input_nickname_dup").value;
        console.log(newNickname)
        baseAxios.patch(`/my-profile/nickname`, {
            nickname: newNickname,
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            changeState(newNickname)
            handleClose();
        })
    }

    function changePassword() {
        let currentPwd = document.getElementById("input_password_current").value;
        let newPwd = document.getElementById("input_password_new").value;
        let checkPwd = document.getElementById("input_password_new_check").value;


        if (currentPwd === "" || newPwd === "" || checkPwd === "") {
            alert("입력하지 않은 값이 있습니다.");
            return;
        }

        if (newPwd === checkPwd) {
            alert("비밀번호 확인이 틀렸습니다.");
            return;
        }
    }

    function sendMail() {
        const mailAddress = document.getElementById("input_email").value;

        baseAxios.post("/my-profile/send-mail", {
            email: mailAddress
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
            document.getElementById("auth_key_area").style.display="flex";
            setDisabled(false);
            setTimerOps(true);
            setMinutes(5);
            setSeconds(0);
        })
    }

    function verifyCodeAndChangeMail() {
        const mailAddress = document.getElementById("input_email").value;

        let code = document.getElementById('input_auth_key').value;
        console.log(code)
        baseAxios.patch("/my-profile/verify-code",{
            email : mailAddress,
            code : code
        },{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            changeState(mailAddress);
            alert("인증 메일이 등록되었습니다.");
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <>
        <Button
            variant="primary" onClick={handleShow}>
            {title} 설정하기
        </Button> <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>{title} 설정하기</Modal.Title>
        </Modal.Header>

        {
            mode === "nickname" ?
                <>
                    <Modal.Body>
                        <Form.Label>닉네임 중복검사</Form.Label>
                        <Row>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="nickname"
                                    autoFocus id={"input_nickname_dup"}
                                />
                            </Col>
                            <Col sm={4}>
                                <Button onClick={isNicknameDuplicate} variant={"warning"}>중복 검사하기</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            취소하기
                        </Button>
                        <Button onClick={changeNickname} id={"nickname_update_submit_btn"} disabled={disabled}
                                variant="warning">사용하기</Button>
                    </Modal.Footer>
                </>
                : null
        }

        {
            mode === "mail" ? <>
                    <Modal.Body>
                        <Form.Label>인증 메일</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="이메일 주소"
                            autoFocus id={"input_email"}
                        />
                        <Button  variant={"warning"} onClick={sendMail}>인증 메일 전송</Button>

                        <Row id={"auth_key_area"} style={{display:"none"}}>
                            <Col sm={10}>
                                <Form.Control
                                    type={"text"}
                                    placeholder={"인증 키를 입력하세요"}
                                    id={"input_auth_key"}/></Col>
                            <Col sm={2}>
                                <div id={"auth_timer"}>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            취소하기
                        </Button>
                        <Button onClick={verifyCodeAndChangeMail}  disabled={disabled} id={"mail_update_submit_btn"} variant="warning">사용하기</Button>
                    </Modal.Footer>
                </>
                : null
        }

        {
            mode === "password" ?
                <>
                    <Modal.Body>
                        <Form.Label>현재 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="현재 비밀번호"
                            autoFocus id={"input_password_current"}
                        />
                        <Form.Label>새 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="새 비밀번호"
                            autoFocus id={"input_password_new"}
                        />
                        <Form.Label>새 비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="새 비밀번호 확인"
                            autoFocus id={"input_password_new_check"}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            취소하기
                        </Button>
                        <Button onClick={changePassword} id={"password_update_submit_btn"}
                                variant="warning">사용하기</Button>
                    </Modal.Footer>
                </>
                : null
        }

    </Modal></>
};


