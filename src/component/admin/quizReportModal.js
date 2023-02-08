import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";
import {Button, Form, Modal} from "react-bootstrap";
import ReportField from "./reportField";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

export default function QuizReportModal({quizId, _show,_setShow}){
    const [quiz,setQuiz] = useState();
    const [nOfReports, setNOfReports] = useState({
        conts : []
    });
    useEffect(() => {
        if(quizId === undefined)
            return;

        tokenAxios.get(`/admin/reports/quiz/${quizId}`)
            .then(res => {
                setQuiz(res.data);
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
    },[quizId])

    const handleClose = ()=>{
        _setShow(false);
    }

    const tag_field= () =>{
        if(quiz?.targetInfo.tags.length === 0)
            return;

        return <div className={"flex-box form-control tag_area"}>
            {quiz?.targetInfo.tags.map(t => {
                return  <div className="comu_tag tag_font" style={{backgroundColor : t.color}}>{t.name}</div>
            })}
        </div>
    }
    const deleteButtonClicked = () => {
        if(!window.confirm("정말로 해당 게시글을 삭제하시겠습니까?"))
            return;
        tokenAxios.delete(`/admin/quiz/${quizId}`)
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
                    <Modal.Title>신고된 퀴즈 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className={"card_block"}>
                            <img className={"card_img"} src={quiz?.targetInfo.pictureUrl}/>
                        </div>
                        <Form.Control
                            readOnly={true}
                            value={quiz?.targetInfo.characterName}
                        />
                        {tag_field()}

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