import {useState} from "react";
import {validateEmail, validateId} from "../../utils/global/validate";
import {baseAxios} from "../../utils/global/axios-config";
import {Button, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function TemporaryPasswordModal({_show, _setShow}) {
    const [email, setEmail] = useState("");
    const [loginId, setLoginId] = useState("");
    const [mode, setMode] = useState(false);


    const [message, setMessage] = useState("");

    const handleClose = () => {
        _setShow(false);
        setMessage("")
        setEmail("")
        setLoginId("")
        setMode(false);
        document.querySelector(".find_id_error_area").style.display = "none";
    }
    const showErrorMessage = (errorMessage) => {
        setMessage(errorMessage);
        setMode(false)
        document.querySelector(".find_id_error_area").style.display = "flex";
        document.querySelector(".find_id_error_area").classList.remove("find_correct_message");
    }
    const showCorrectMessageArea = (correctMessage) => {
        setMessage(correctMessage);
        setMode(true)
        document.querySelector(".find_id_error_area").style.display = "flex";
        document.querySelector(".find_id_error_area").classList.add("find_correct_message");

    }
    const createMessage = () => {
        if (mode)
            return <span><FontAwesomeIcon icon={faCircleInfo}/>{message}</span>;
        else
            return <span><FontAwesomeIcon icon={faTriangleExclamation}/>{message}</span>;
    }

    const changeToTemporaryPassword = () => {
        if (!validateEmail(email)) {
            showErrorMessage("입력하신 이메일이 유효한 형식을 따르지 않습니다.");
        } else if(!validateId(loginId)){
            showErrorMessage("입력하신 아이디가 유효한 형식을 따르지 않습니다.");
        }
        else {

            baseAxios.patch(`/user/password`, {
                email,
                loginId
            }).then((res) => {
                showCorrectMessageArea("입력하신 이메일로 임시 비밀번호가 전송되었습니다.")
            }).catch((err) => {
                if (err.response.status === 404) {
                    showErrorMessage(err.response.data.errorMessage)
                }
            })
        }
    }
    return (
        <>
            <Modal show={_show} onHide={handleClose} className={"text_korean"}>
                <Modal.Header closeButton>
                    <Modal.Title className={"modal_title_center_temp_pw text_korean"}>임시 비밀번호 발급</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className={"justify-content-between mt-3"}>
                        <Form.Group className={"flex-box justify-content-between align-items-center"}>
                            <div
                                className={"col-2 text_korean cus_label flex-box justify-content-center align-items-center"}>아이디
                            </div>
                            <Form.Control value={loginId} onChange={
                                (event) => setLoginId(event.target.value)}
                                          className={"w-80"}
                                          type={"text"} placeholder={"아이디"}/>
                        </Form.Group>
                    </Row>
                    <Row className={"justify-content-between mt-3"}>
                        <Form.Group className={"flex-box justify-content-between align-items-center"}>
                            <div
                                className={"col-2 text_korean cus_label flex-box justify-content-center align-items-center"}>이메일
                            </div>
                            <Form.Control value={email} onChange={
                                (event) => setEmail(event.target.value)}
                                          className={"w-80"}
                                          type={"text"} placeholder={"이메일"}/>
                        </Form.Group>
                    </Row>


                    <div className={"find_id_error_area mt-3"}>
                      {createMessage()}
                    </div>
                </Modal.Body>
                <Modal.Footer className={"flex-box justify-content-center"}>
                    <Button variant="warning" onClick={changeToTemporaryPassword} className={"col-4 main_btn"}>
                        인증하기
                    </Button>
                    <Button variant="secondary" onClick={handleClose} className={"col-4"}>
                        취소하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}