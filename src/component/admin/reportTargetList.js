import {useEffect, useState} from "react";
import {ORDER_COND, TARGET_TYPE} from "../../utils/constants";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";
import {Button, Form, Table} from "react-bootstrap";
import PageNum from "../community/pageNum";
import CommentReportModal from "./commentReportModal";
import QuizReportModal from "./quizReportModal";

export default function ReportTargetList(){
    const [paging,setPaging] = useState({
        targets: [],
        currentPage : 0,
        nextPage : 0,
        lastPage : 0,
    });
    const[order,setOrder] = useState(ORDER_COND.RECENT);
    const[filter,setFilter] = useState(TARGET_TYPE.ALL);
    const[min, setMin] = useState(0);
    const [commentId,setCommentId] = useState();
    const [quizId,setQuizId] = useState();
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);


    function retrieveReports(num) {
        tokenAxios.get(`/admin/reports/target/${filter}?pageNum=${num}&order=${order}
        &min=${min}`,
        )
            .then(res => {
                setPaging({
                    targets: res.data.targets,
                    currentPage: res.data.currentPage,
                    nextPage: res.data.nextPage,
                    lastPage: res.data.lastPage
                });
            }).catch(err => handleError(err));
    }

    useEffect(()=>{

        retrieveReports(0);
    },[order,filter,min])

    const orderCondChanged = (e) =>{
        setOrder(e.target.value);
    }
    const filterChanged = (e) =>{
        setFilter(e.target.value);
    }

    const retrievePrevPage = () => {
        if(paging.currentPage - 1 < 0)
            return;
        retrieveReports(paging.currentPage - 1);
    }

    const reloadCurrentPage = () => {
        retrieveReports(paging.currentPage);
    }

    const retrieveNextPage = () => {
        if (paging.lastPage < paging.nextPage)
            return;
        retrieveReports(paging.nextPage);
    }

    const showModal = (id, type) => {
        if (type === '댓글') {
            setShowCommentModal(true);
            setCommentId(id);
            return;
        }
        setShowQuizModal(true);
        setQuizId(id);


    }

    return (
        <>
            <div className={"top-space"}>
                <div className={"insite-title flex-box justify-content-center align-items-center mb-3 "}>
                    <span className={"mr-5"}>신고 게시글 목록</span>
                    <Form.Select onChange={orderCondChanged} className={"col-1"}>
                        <option value={ORDER_COND.RECENT}>최신순</option>
                        <option value={ORDER_COND.OLDER}>오래된순</option>
                    </Form.Select>
                    <Form.Select onChange={filterChanged} className={"col-1"}>
                        <option value={TARGET_TYPE.ALL}>모두</option>
                        <option value={TARGET_TYPE.QUIZ}>퀴즈</option>
                        <option value={TARGET_TYPE.COMMENT}>댓글</option>
                    </Form.Select>
                    <Form.Control min={0} value={min} onChange={(e) => setMin(e.target.value)} className={"col-1"} type={"number"}/>
                </div>

                <Table  striped bordered hover>
                    <thead>
                    <tr>
                        <th>종류</th>
                        <th>신고 수(개)</th>
                        <th>조회</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paging.targets.map(r => {
                        return <tr>
                            <td>{r.targetType}</td>
                            <td>{r.nofReports}</td>
                            <td><Button size={"sm"} onClick={() => showModal(r.targetId, r.targetType)}>조회</Button></td>
                        </tr>
                    })}
                    </tbody>
                </Table>
                <PageNum currentPage={paging.currentPage + 1} lastPage={paging.lastPage + 1}
                         retrievePrevPage={retrievePrevPage} retrieveNextPage={retrieveNextPage}/>
            </div>
            <CommentReportModal commentId={commentId} _setShow={setShowCommentModal} _show={showCommentModal}/>
            <QuizReportModal quizId={quizId} _setShow={setShowQuizModal} _show={showQuizModal} />
        </>
    )
}