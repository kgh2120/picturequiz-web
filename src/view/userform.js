import Navbar from "./component/navbar/navbar";
import Form_logo from "./component/form/form_logo";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


export default function Userform({_mode}) {

    const [id, setId] = useState();
    const [pwd, setPwd] = useState();

    function changeId(event) {
        setId(event.target.value)
    }
    function changePwd(event) {
        setPwd(event.target.value)
    }
    function clearInput() {
        setId("");
        setPwd("");
    }

    const navigate = useNavigate();

    async function login() {
        await axios.post("http://localhost:8080/login",
            {
                loginId: id,
                password: pwd
            })
            .then((res) => {
            localStorage.setItem("access-token",res.headers["access-token"])
            localStorage.setItem("refresh-token",res.headers["access-token"])
            navigate("/")
        })
            .catch(error => {
                console.log(error)
                alert(error.response.data.errorMessage)
            })
    }

    async function signIn() {
        const response = await axios.post("http://localhost:8080/signUp",
            {
                loginId: id,
                password: pwd
            }).then(() => {
            alert("회원가입이 완료되었습니다. - 로그인 페이지로 이동합니다.")
            clearInput();
            navigate("/login")
        }).catch(error => {
            console.log(error)
        })
        console.log(response)
    }



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
                <input onChange={changeId} id={"userform_input_id"} className={"userform_form_input"} type={"text"}
                       placeholder={"로그인 아이디"}/>
                <input onChange={changePwd} id={"userform_input_pwd"} className={"userform_form_input"} type={"password"}
                       placeholder={"비밀번호"}/>

                {_mode === "login" ?
                    <>
                        <button onClick={login} className={"userform_form_input userform_form_login_btn"}
                                role={"button"}>로그인
                        </button>
                        <button className={"userform_form_signup_move_btn"}><Link to={"/signUp"}>계정 생성 </Link></button>
                    </>
                    : <button onClick={signIn} className={"userform_form_input userform_form_login_btn"}
                              role={"button"}>회원가입</button>}
                <div className={"userform_admin_info"}>
                    <h4>운영자 문의 : kgh2120@gmail.com</h4>
                </div>

            </div>
        </div>
    </>
}