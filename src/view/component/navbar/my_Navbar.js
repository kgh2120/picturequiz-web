import Container from 'react-bootstrap/Container';
import {useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

export default function My_Navbar() {

    const accessToken = localStorage.getItem("access-token")
    const [logined,setLogined] = useState(accessToken !== null)


    return  <Navbar className={"nav_area"} bg="green" expand="lg" >
        <Container >
            <Navbar.Brand className={"nav_logo"} href="/">Picture-Quiz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse  id="basic-navbar-nav" >
                <Nav  className="me-auto" >
                    <Nav.Link  className={"text-white"} href="#home">Home</Nav.Link>
                    <Nav.Link  className={"text-white"} href="#link">Link</Nav.Link>
                </Nav>
                {logined ?
                    <Nav >
                        <Nav.Link className={"text-white"} href={"/my-page"}>
                            <FontAwesomeIcon className={"nav_userform_icon"} icon={faCircleInfo} />
                            <span className={"nav_text_korean "}>내 정보 보기</span>
                        </Nav.Link>

                        <Nav.Link className={"text-white"} href={"/logout"}>
                            <FontAwesomeIcon className={"nav_userform_icon"} icon={faRightToBracket}></FontAwesomeIcon>
                            <span>LogOut</span>
                        </Nav.Link>
                    </Nav>
                    : <Nav className={"c_nav_text"}>
                        <Nav.Link className={"text-white"} href={"/login"}>
                            <FontAwesomeIcon className={"nav_userform_icon"} icon={faRightToBracket}></FontAwesomeIcon>
                            <span >Login</span>
                        </Nav.Link>
                    </Nav>}
            </Navbar.Collapse>

        </Container>
    </Navbar>



}