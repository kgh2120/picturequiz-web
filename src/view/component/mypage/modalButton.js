import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";




export default function ModalButton({mode, changeState}) {

    const token = localStorage.getItem("access-token");

    const [disabled, setDisabled] = useState(true);

    function isNicknameDuplicate() {
        const newNickname = document.getElementById("input_nickname_dup").value;
        axios.get(`http://localhost:8080/my-profile/nickname?nickname=${newNickname}`,{
            headers : {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            const btn = document.getElementById("nickname_update_submit_btn");
            if (res.data === false) {
                document.getElementById("input_nickname_dup").readOnly = true;
                setDisabled(false)
                alert("사용 가능한 닉네임입니다.")
            }else {
                alert("사용 불가능한 닉네임입니다.")
                btn.disabled = true;
            }
        })
    }

    function changeNickname() {
        const newNickname = document.getElementById("input_nickname_dup").value;
        console.log(newNickname)
        axios.patch(`http://localhost:8080/my-profile/nickname`,{
            nickname : newNickname,
        },{
            headers : {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            changeState(newNickname)
            handleClose();
        })
    }

    let title = "";

    switch (mode) {
        case "nickname" : title = "닉네임"; break
        case "mail" : title = "인증 메일"; break
        case "password" : title = "비밀번호"; break
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <>
        <Button
            variant="primary" onClick={handleShow}>
            {title} 설정하기
        </Button>  <Modal
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
                    <Button onClick={changeNickname} id={"nickname_update_submit_btn"} disabled={disabled} variant="warning">사용하기</Button>
                </Modal.Footer>
                </>
                : null
        }




        </Modal></>
};


