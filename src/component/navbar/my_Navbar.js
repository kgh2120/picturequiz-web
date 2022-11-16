import Container from 'react-bootstrap/Container';
import {useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export default function My_Navbar() {

    const accessToken = localStorage.getItem("access-token")
    const [logined,setLogined] = useState(accessToken !== null)
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("access-token")
        setLogined(false);
        navigate("/");
    }

    return  <Navbar className={"nav_area"} bg="green" expand="lg" >
        <Container >
            <Navbar.Brand className={"nav_logo"} href="/">Picture-Quiz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse  id="basic-navbar-nav" >
                <Nav  className="me-auto nav_text_korean" >
                    <Nav.Link  className={"cus-nav"} href="/">퀴즈 리스트</Nav.Link>
                    {logined ?
                        <>
                            <Nav.Link  className={"cus-nav"} href="/quiz/my">내가 만든 퀴즈</Nav.Link>
                            <Nav.Link  className={"cus-nav"} href="/quiz/add">퀴즈 등록하기</Nav.Link>
                        </>
                        : null}

                </Nav>
                {logined ?
                    <Nav >
                        <Nav.Link className={"cus-nav"} href={"/my-page"}>
                            <FontAwesomeIcon className={"nav_userform_icon"} icon={faCircleInfo} />
                            <span className={"nav_text_korean "}>내 정보 보기</span>
                        </Nav.Link>

                        <Nav.Link className={"cus-nav"} onClick={logout}>
                            <FontAwesomeIcon className={"nav_userform_icon"} icon={faRightToBracket}></FontAwesomeIcon>
                            <span>LogOut</span>
                        </Nav.Link>
                    </Nav>
                    : <Nav className={"c_nav_text"}>
                        <Nav.Link className={"cus-nav"} href={"/login"}>
                            <FontAwesomeIcon className={"nav_userform_icon"} icon={faRightToBracket}></FontAwesomeIcon>
                            <span >Login</span>
                        </Nav.Link>
                    </Nav>}
            </Navbar.Collapse>

        </Container>
    </Navbar>



}