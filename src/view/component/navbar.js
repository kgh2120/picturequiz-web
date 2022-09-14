import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import NavbarLoginOut from "./navbar-login-out";
export default function Navbar() {
    return <nav className={"navbar"}>
        <div className={"navbar_logo_area"}>
            <FontAwesomeIcon icon={faImage} />
            <span>Picture-Q</span>
        </div>
        <div className={"navbar_list_area"}>
            <li>안녕하세요</li>
            <li>안녕하세요</li>
            <li>안녕하세요</li>
        </div>
        <NavbarLoginOut text={"Login"} to={"/login"}/>
    </nav>
}