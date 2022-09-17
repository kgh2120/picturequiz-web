import NavbarLoginOut from "./navbar-login-out";
import {useState} from "react";

export default function Navbar() {
    const accessToken = localStorage.getItem("access-token")
    const [logined,setLogined] = useState(accessToken !== null)



    return <nav className={"navbar"}>
        <div className={"navbar_logo_area"}>

            <span>Picture</span><br/>
            <span>Quiz</span>
        </div>
        <div className={"navbar_list_area"}>
            <li>안녕하세요</li>
            <li>안녕하세요</li>
            <li>안녕하세요</li>
        </div>
        <NavbarLoginOut _mode={logined} _setMode={setLogined}/>
    </nav>
}