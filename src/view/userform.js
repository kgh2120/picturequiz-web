import Navbar from "./component/navbar/navbar";
import Form_logo from "./component/form/form_logo";
import {Link} from "react-router-dom";

import {useState} from "react";

export default function Userform({_mode}) {



    return <>
        <Navbar/>
        <div className={"userform_area"}>
            <Form_logo/>
            <div className={"userform_intro_area"}>
                <div><h3>Welcome To Picture-Quiz</h3></div>
                {_mode === "login" ? (<div><span>로그인을 하여 퀴즈를 직접 만들어보세요</span></div>)
                    : null
                }
                <div><span>별도의 인증 없이도 계정을 생성할 수 있어요</span></div>

            </div>
            <div className={"userform_form_area"}>
                <input className={"userform_form_input"} type={"text"} placeholder={"로그인 아이디"}/>
                <input className={"userform_form_input"} type={"password"} placeholder={"비밀번호"}/>

                {_mode === "login" ?
                    <>
                    <button className={"userform_form_input userform_form_login_btn"} role={"button"}>로그인</button>
                    <button className={"userform_form_signup_move_btn"}> <Link to={"/signUp"}>계정 생성 </Link></button>
                    </>
                : <button className={"userform_form_input userform_form_login_btn"} role={"button"}>회원가입</button>}
                


                <div className={"userform_admin_info"}>
                    <h4>운영자 문의 : kgh2120@gmail.com</h4>
                </div>

            </div>
        </div>



    </>
}