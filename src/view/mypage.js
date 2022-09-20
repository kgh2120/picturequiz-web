import My_Navbar from "./component/navbar/my_Navbar";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function MyPage() {



    const [id, setId] = useState();
    const [nickname, setNickname] = useState();
    const [mail, setMail] = useState();

    const token = localStorage.getItem("access-token");

    async function loading(){

        return await axios.get("http://localhost:8080/my-profile",
            {
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            }
        )
    }



    loading().then(res => {
            setId(res.data.loginId);
            setNickname(res.data.nickname);
            setMail(res.data.authEmail);
    })


    return<>
        <My_Navbar/>
        <div className={"my-page-area"}>
            <div className={"my-page_info"}>
                <span>회원 정보</span>
            </div>
            <div className={"my-page_content_area"}>
                <div className={"my-page_content"}>
                    <span className={"my-page_content_label"}>아이디</span>
                    <div className={"my-page_content_input"}>{id}</div>
                </div>
                <div className={"my-page_content"}>
                    <span className={"my-page_content_label"}>닉네임</span>
                    {
                        nickname !== null ?
                            <div className={"my-page_content_input"}>{nickname}</div> :
                            <div className={"my-page_content_input page_content_input_not_setting"}>닉네임이 설정되어 있지 않습니다.</div>
                    }

                </div>
                <div className={"my-page_content"}>
                    <span className={"my-page_content_label"}>인증 메일</span>

                    {
                        mail !== null ?
                            <div className={"my-page_content_input"}>{mail}</div> :
                            <div className={"my-page_content_input page_content_input_not_setting"}>인증 메일이 설정되어있지 않습니다.</div>
                    }

                </div>
                <div className={"my-page_content "}>
                    <div className={"my-page_content_button_area"}>
                        <button className={"my-page_content_button  my-page_content_button_edit"}><Link to={"/my-profile/update"}>정보 변경</Link></button>
                        <button className={"my-page_content_button my-page_content_button_delete"}>탈퇴하기</button>
                    </div>

                </div>
            </div>
        </div>

    </>
}
