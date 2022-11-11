import My_Navbar from "./component/navbar/my_Navbar";
import {useState} from "react";
import axios from "axios";
import Mypageinfoheader from "./component/mypage/mypageinfoheader";
import Mypagebuttongroup from "./component/mypage/mypagebuttongroup";
import Mypageinforead from "./component/mypage/mypageinforead";
import MyPageInfoUpdate from "./component/mypage/myPageInfoUpdate";
import {baseAxios, tokenAxios} from "../function/global/axios-config";
import {Card, Button, ListGroup, Col} from "react-bootstrap";
import ModalButton from "./component/mypage/modalButton";

export default function MyPage({mode}) {

    let infoText = mode !== "update" ? "회원 정보" : "회원 정보 수정";


    const [id, setId] = useState();
    const [nickname, setNickname] = useState();
    const [mail, setMail] = useState();

    const token = localStorage.getItem("access-token");

    async function loading() {
        return await tokenAxios.get("/my-profile")
    }

    loading().then(res => {
        console.log(res.data)
        setId(res.data.loginId);
        setNickname(res.data.nickname);
        setMail(res.data.authEmail);
    })


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
                <Button variant="success" className={"w-45"}>돌아가기</Button>
                <Button variant="danger" className={"w-45"}>탈퇴하기</Button>
            </Card.Footer>
        </Card>


    </>
}

