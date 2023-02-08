import {Button, Form, Modal} from "react-bootstrap";
import {TARGET_TYPE} from "../../utils/constants";
import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";
import ReportField from "./reportField";

export default function CommentReportModal({commentId, _show,_setShow}){

    const [comment,setComment] = useState();
    const [nOfReports, setNOfReports] = useState({
        conts : []
    });
    useEffect(() => {
        if(commentId === undefined)
            return;

        tokenAxios.get(`/admin/reports/comments/${commentId}`)
            .then(res => {
                setComment(res.data);
                const keys = Object.keys(res.data.nofReports);
                let array = [];
                let i = 0;
                for (const key of keys) {
                    array[i++]= {
                        name : key,
                        count : res.data.nofReports[key]
                    }
                }
                setNOfReports({
                    conts : array
                })
            }).catch(err => handleError(err))
    },[commentId])

    const handleClose = ()=>{
        _setShow(false);
    }

    const deleteButtonClicked = () => {
        if(!window.confirm("정말로 해당 게시글을 삭제하시겠습니까?"))
            return;
        tokenAxios.delete(`/admin/comments/${commentId}`)
            .then(() => handleClose())
            .catch(err => handleError(err))
    }

    return (
        <>
            <Modal show={_show} onHide={handleClose}
                   backdrop="static"
                   keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>신고된 댓글 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form.Control className={"mb-3"} value={`작성자 : ${comment?.targetInfo.nickname}`}
                                      readOnly={true}/>
                        <Form.Control value={comment?.targetInfo.contents} readOnly={true} as={"textarea"}/>
                    </div>
                    <hr/>
                    <ReportField context={nOfReports?.conts}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={"me-2"} onClick={handleClose}>
                        취소
                    </Button>
                    <Button onClick={deleteButtonClicked} variant="danger">
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}