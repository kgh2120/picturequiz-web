import {Button, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {baseAxios} from "../../utils/global/axios-config";
import {validateEmail} from "../../utils/global/validate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function FindIdModal({_show, _setShow}) {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginId, setLoginId] = useState("");
    const handleClose = () => {
        _setShow(false);
        setErrorMessage("")
        setEmail("")
        setLoginId("")

    }
    const showErrorMessage = (errorMessage) => {
        setErrorMessage(errorMessage);
        document.querySelector(".find_id_error_area").style.display = "flex";
        document.querySelector(".find_id_response_area").style.display = "none";
    }
    const showResponseArea = (message) => {
        setLoginId(message)
        document.querySelector(".find_id_response_area").style.display = "flex";
        document.querySelector(".find_id_error_area").style.display = "none";
    }
    const findIdByEmail = () => {
        if (!validateEmail(email)) {
            showErrorMessage("입력하신 이메일이 유효한 형식을 따르지 않습니다.");

        } else {

            baseAxios.post(`/user/id`, {
                email
            }).then((res) => {
                showResponseArea(res.data.loginId)
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
                    <Modal.Title className={"modal_title_center text_korean"}>아이디 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className={"justify-content-between"}>
                        <Form.Control value={email} onChange={
                            (event) => setEmail(event.target.value)}
                                      className={"w-80"}
                                      type={"text"} placeholder={"이메일"}/>
                        <Button variant={"warning"} className={"col-2 text_korean main_btn"} onClick={findIdByEmail}>인증</Button>
                        <div className={"find_id_error_area mt-3"}>
                            <span>
                            <FontAwesomeIcon icon={faTriangleExclamation}/>{errorMessage}
                                </span>
                        </div>
                    </Row>
                    <Row className={"find_id_response_area mt-3"}>
                        <hr className={"mt-3"}/>
                        <Form.Group className={"flex-box justify-content-between align-items-center"}>
                            <div className={"col-2 text_korean cus_label flex-box justify-content-center align-items-center"}>아이디</div>
                            <Form.Control className={"w-80"} value={loginId} readOnly type={"text"}/>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer className={"flex-box justify-content-center"}>
                    <Button variant="secondary" onClick={handleClose} className={"col-4"}>
                        취소하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}