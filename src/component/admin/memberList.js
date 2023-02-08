import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";
import {Form, Table} from "react-bootstrap";
import {ORDER_COND} from "../../utils/constants";
import PageNum from "../community/pageNum";

export default function MemberList(){

    const [paging,setPaging] = useState({
        members: [],
        currentPage : 0,
        nextPage : 0,
        lastPage : 0,
    });
    const[order,setOrder] = useState(ORDER_COND.RECENT);


    function retrieveMembers(num) {
        tokenAxios.post("/admin/members",
            {
                pageNum: num,
                orderCondition: order
            })
            .then(res => {
                setPaging({
                    members: res.data.members,
                    currentPage: res.data.currentPage,
                    nextPage: res.data.nextPage,
                    lastPage: res.data.lastPage
                });
            }).catch(err => handleError(err));
    }

    useEffect(()=>{

        retrieveMembers(0);
    },[order])

    const orderCondChanged = (e) =>{
        setOrder(e.target.value);
    }

    const retrievePrevPage = () => {
        if(paging.currentPage - 1 < 0)
            return;
        retrieveMembers(paging.currentPage - 1);
    }

    const reloadCurrentPage = () => {
        retrieveMembers(paging.currentPage);
    }

    const retrieveNextPage = () => {
        if (paging.lastPage < paging.nextPage)
            return;
        retrieveMembers(paging.nextPage);
    }

    return (
        <>
            <div className={"top-space"}>
                <div className={"insite-title flex-box justify-content-center align-items-center mb-3 "}>
                    <span className={"mr-5"}>회원 목록</span>
                    <Form.Select onChange={orderCondChanged} className={"col-2"}>
                        <option value={ORDER_COND.RECENT}>최신순</option>
                        <option value={ORDER_COND.OLDER}>오래된순</option>
                        <option value={ORDER_COND.QUIZ_DESC}>퀴즈 많은 순</option>
                        <option value={ORDER_COND.QUIZ_ASC}>퀴즈 적은 순</option>
                        <option value={ORDER_COND.COMMENT_DESC}>댓글 많은 순</option>
                        <option value={ORDER_COND.COMMENT_ASC}>댓글 적은 순</option>
                    </Form.Select>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>닉네임</th>
                            <th>이메일</th>
                            <th>퀴즈(개)</th>
                            <th>댓글(개)</th>
                            <th>생성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {paging.members.map(m => {
                        return <tr>
                            <td>{m.memberId}</td>
                            <td>{m.nickname === null ? "익명" : m.nickname}</td>
                            <td>{m.mail === null?  "미등록" : m.mail}</td>
                            <td>{m.nofQuiz}개</td>
                            <td>{m.nofComment}개</td>
                            <td>{m.createdDate}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
                <PageNum currentPage={paging.currentPage + 1} lastPage={paging.lastPage + 1}
                         retrievePrevPage={retrievePrevPage} retrieveNextPage={retrieveNextPage}/>
            </div>
        </>
    )
}