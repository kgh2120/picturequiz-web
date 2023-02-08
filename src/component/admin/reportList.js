import {Form, Table} from "react-bootstrap";
import {ORDER_COND, QUIZ_REPORT_TYPE, TARGET_TYPE} from "../../utils/constants";
import PageNum from "../community/pageNum";
import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";

export default function ReportList(){

    const [paging,setPaging] = useState({
        reports: [],
        currentPage : 0,
        nextPage : 0,
        lastPage : 0,
    });
    const[order,setOrder] = useState(ORDER_COND.RECENT);
    const[filter,setFilter] = useState(TARGET_TYPE.ALL);


    function retrieveReports(num) {
        tokenAxios.get(`/admin/reports/${filter}?pageNum=${num}&order=${order}`,
)
            .then(res => {
                setPaging({
                    reports: res.data.reports,
                    currentPage: res.data.currentPage,
                    nextPage: res.data.nextPage,
                    lastPage: res.data.lastPage
                });
            }).catch(err => handleError(err));
    }

    useEffect(()=>{

        retrieveReports(0);
    },[order])

    const orderCondChanged = (e) =>{
        setOrder(e.target.value);
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

    return (
        <>
            <div className={"top-space"}>
                <div className={"insite-title flex-box justify-content-center align-items-center mb-3 "}>
                    <span className={"mr-5"}>신고 목록</span>
                    <Form.Select onChange={orderCondChanged} className={"col-2"}>
                        <option value={ORDER_COND.RECENT}>최신순</option>
                        <option value={ORDER_COND.OLDER}>오래된순</option>
                    </Form.Select>
                </div>

                <Table  striped bordered hover>
                    <thead>
                    <tr>
                        <th>신고자</th>
                        <th>종류</th>
                        <th>신고 타입</th>
                        <th>내용</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paging.reports.map(r => {
                        return <tr>
                            <td>{r.reporterNickname === null ? "익명" : r.reporterNickname}</td>
                            <td>{r.targetType}</td>
                            <td>{r.reportType}</td>
                            <td>{r.desc === "" ? "[없음]" : r.desc}</td>
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