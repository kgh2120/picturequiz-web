import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";

export default function Modalbutton({mode}) {

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
        <Modal.Body>
            <Form.Label>닉네임 중복검사</Form.Label>
            <Row>
                <Col sm={8}>
                    <Form.Control
                        type="text"
                        placeholder="nickname"
                        autoFocus
                    />
                </Col>
                <Col sm={4}>
                    <Button variant={"warning"}>중복 검사하기</Button>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                취소하기
            </Button>
            <Button variant="warning">사용하기</Button>
        </Modal.Footer>
    </Modal></>
};