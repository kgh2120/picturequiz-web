import {Button, Form, Modal} from "react-bootstrap";
import {COMMENT_REPORT_TYPE, QUIZ_REPORT_TYPE, TARGET_TYPE} from "../../utils/constants";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";

export default function ReportModal({_show, _setShow,_targetId, _targetType}){

    const ReportType = _targetType === TARGET_TYPE.QUIZ ? QUIZ_REPORT_TYPE : COMMENT_REPORT_TYPE;

    const handleClose = ()=>{
        _setShow(false);
    }

    const sendReport = (event)=>{
        const form = event.currentTarget;
        event.preventDefault();

        let typeEng = "";
        for (let i = 0; i < form.report_type.length; i++) {
            if(form.report_type[i].checked){
                typeEng = ReportType[i].ENG;
                break;
            }
        }

        tokenAxios.post("/reports",
            {targetId : _targetId,
                targetType : _targetType,
                reportType : typeEng,
                reportDescription : form.desc.value}
            ).then(() => {
                alert("신고가 접수되었습니다.");
                handleClose();
        }).catch(error => {
            handleError(error);
        })
    }

    return (
        <>
            <Modal show={_show} onHide={handleClose}
                   backdrop="static"
                   keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>퀴즈 신고</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendReport}>
                        <Form.Group>
                            {
                                ReportType.map(type => {
                                    return <Form.Check
                                    label={type.KOR}
                                    name={"report_type"}
                                    type={'radio'}
                                    required
                                    className={"mt-2"}
                                    />
                                })
                            }
                        </Form.Group>
                        <hr/>
                        <Form.Control as={"textarea"} name={"desc"}/>
                        <hr/>
                        <div className={"flex-box flex-end"}>
                            <Button variant="secondary" className={"me-2"} onClick={handleClose}>
                                취소
                            </Button>
                            <Button variant="danger" type={"submit"} >
                                신고
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>



            </Modal>
        </>


    )

}