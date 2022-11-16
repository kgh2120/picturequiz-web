import {Modal, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function AnswerModal({_show, _setShow, _name}) {

    const navigate = useNavigate();

    const answer_close = () => _setShow(false);
    const moveToMain = () =>{
        navigate("/", { replace: true});
    }

    return <>
        <Modal className={"answer_box"} show={_show} onHide={answer_close} centered>
            <Modal.Header className={"answer_header"} >
                <Modal.Title className={"answer_title"}>정답</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"answer_body"}>{_name}</Modal.Body>
            <Modal.Footer className={"answer_footer"}>
                <Button className={"w-45"} variant="success" onClick={moveToMain}>
                    돌아가기
                </Button>
                <Button className={"w-45"} variant="warning" >
                    커뮤니티
                </Button>
            </Modal.Footer>
        </Modal>
    </>
};