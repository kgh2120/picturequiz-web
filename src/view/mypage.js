import My_Navbar from "./component/navbar/my_Navbar";
import {useState} from "react";
import axios from "axios";
import Mypageinfoheader from "./component/mypage/mypageinfoheader";
import Mypagebuttongroup from "./component/mypage/mypagebuttongroup";
import Mypageinforead from "./component/mypage/mypageinforead";
import MyPageInfoUpdate from "./component/mypage/myPageInfoUpdate";
import {baseAxios} from "../function/global/axios-config";

export default function MyPage({mode}) {

    let infoText = mode !== "update" ? "회원 정보" : "회원 정보 수정";


    const [id, setId] = useState();
    const [nickname, setNickname] = useState();
    const [mail, setMail] = useState();

    const token = localStorage.getItem("access-token");

    async function loading() {

        return await baseAxios.get("http://localhost:8080/my-profile",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    }


    loading().then(res => {
        setId(res.data.loginId);
        setNickname(res.data.nickname);
        setMail(res.data.authEmail);
    })


    return <>
        <div className={"my-page-area"}>
            <Mypageinfoheader text={infoText}/>
            {
                mode !== "update" ? <Mypageinforead id={id} nickname={nickname} mail={mail}/> :
                    <MyPageInfoUpdate _id={id} _nickname={nickname} _mail={mail}
                    _setNickname={setNickname} _setMail={setMail}/>
            }

            <Mypagebuttongroup _mode={mode}/>
        </div>

    </>
}

