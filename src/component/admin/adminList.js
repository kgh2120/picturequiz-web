import {Button, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";

export default function AdminList(){

    const [admins,setAdmins] = useState([]);

    useEffect(()=>{
        tokenAxios.get("/admin")
            .then(res =>
            setAdmins(res.data))
    },[admins])

    const adminDeleteButtonClicked = (adminId) => {

        if(!window.confirm("정말 관리자 계정을 삭제하시겠습니까?"))
            return;

        tokenAxios.delete(`/admin/${adminId}`)
            .then(() => {
                setAdmins((current)=>
                current.filter(a=>a.id !== adminId))
            }).catch(err => handleError(err));
    }

    return (
        <>
        <div className={"top-space"}>
            <div className={"insite-title flex-box justify-content-center align-items-center mb-3"}>
                <span>관리자 목록</span>
            </div>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>아이디</th>
                <th>닉네임</th>
                <th>생성일</th>
                <th className={"col-1"}>삭제</th>
            </tr>
            </thead>
            <tbody>
            {admins.map(a => {
                return <tr>
                    <td>#</td>
                    <td>{a.loginId}</td>
                    <td>{a.nickName}</td>
                    <td>{a.createdAt}</td>
                    <td><Button onClick={() => adminDeleteButtonClicked(a.adminId)} size={"sm"}  variant={"danger"}>삭제</Button></td>
                </tr>
            })}
            </tbody>

        </Table>
        </div>
        </>
    )
}