import {Modal, Button} from "react-bootstrap";

export default function AnswerModal({_show, _setShow, _name}) {

    const answer_close = () => _setShow(false);

    return <>
        <Modal className={"answer_box"} show={_show} onHide={answer_close} centered>
            <Modal.Header className={"answer_header"} >
                <Modal.Title className={"answer_title"}>정답</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"answer_body"}>{_name}</Modal.Body>
            <Modal.Footer className={"answer_footer"}>
                <Button className={"w-45"} variant="success">
                    돌아가기
                </Button>
                <Button className={"w-45"} variant="warning" >
                    커뮤니티
                </Button>
            </Modal.Footer>
        </Modal>
    </>
};