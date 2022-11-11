import My_Navbar from "./component/navbar/my_Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import Mypageinfoheader from "./component/mypage/mypageinfoheader";
import Mypagebuttongroup from "./component/mypage/mypagebuttongroup";
import Mypageinforead from "./component/mypage/mypageinforead";
import MyPageInfoUpdate from "./component/mypage/myPageInfoUpdate";
import {baseAxios, tokenAxios} from "../function/global/axios-config";
import {Card, Button, ListGroup, Col, Modal} from "react-bootstrap";
import ModalButton from "./component/mypage/modalButton";
import {useNavigate} from "react-router-dom";
import {deleteToken} from "../function/global/token";

export default function MyPage({mode}) {

    let infoText = mode !== "update" ? "회원 정보" : "회원 정보 수정";


    const [id, setId] = useState();
    const [nickname, setNickname] = useState();
    const [mail, setMail] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const token = localStorage.getItem("access-token");

    useEffect(() => {
        loading().then(res => {
            console.log(res.data)
            setId(res.data.loginId);
            setNickname(res.data.nickname);
            setMail(res.data.authEmail);
        })
    },[])

    async function loading() {
        return await tokenAxios.get("/my-profile")
    }


    const moveToHome = () =>{
        navigate("/",{replace:true})
    }

    const showDeleteModal = () =>{
        setShow(true)
    }
    const deleteAccount = () =>{
        tokenAxios.delete("/my-profile")
            .then(res => {
                alert("계정이 안전하게 삭제되었습니다.")
                deleteToken();
                moveToHome();
            })
    }

    const handleClose = ()=>{
        setShow(false)
    }

    return <>
        <My_Navbar></My_Navbar>

        <Card className={"m-0 m-auto mt-5 my_info_box"}>
            <Card.Header>
                <h4>내 정보</h4>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item className={"my_info_item"}>
                        <div className={"my_info_item_title"}>ID</div>
                        <div>{id}</div>
                        <Button className={"my_info_item_btn my_info_id_black"}>수정</Button>
                    </ListGroup.Item>
                    <ListGroup.Item className={"my_info_item "}>
                        <div className={"my_info_item_title"}>PW</div>
                        <div>****</div>

                        <ModalButton mode={"password"}/>
                    </ListGroup.Item>
                    <ListGroup.Item className={"my_info_item"}>
                        <div className={"my_info_item_title"}>이메일</div>
                        <div>{mail != null ? mail : "이메일을 설정해주세요"}</div>
                        <ModalButton changeState={setMail} mode={"mail"}/>

                    </ListGroup.Item>
                    <ListGroup.Item className={"my_info_item"}>
                        <div className={"my_info_item_title"}>닉네임</div>
                        <div>{nickname != null ? nickname : "익명"}</div>

                        <ModalButton changeState={setNickname} mode={"nickname"}/>

                    </ListGroup.Item>
                </ListGroup>

            </Card.Body>
            <Card.Footer className={"my_info_footer"}>
                <Button onClick={moveToHome} variant="success" className={"w-45"}>돌아가기</Button>
                <Button onClick={showDeleteModal} variant="danger" className={"w-45"}>탈퇴하기</Button>
            </Card.Footer>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>정말로 삭제하시겠습니까?</Modal.Title>
                </Modal.Header>
                <Modal.Body>계정을 삭제하면, 재미있는 퀴즈를 등록하실 수 없어요!!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        취소하기
                    </Button>
                    <Button variant="danger" onClick={deleteAccount}>
                        삭제하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>


    </>
}

