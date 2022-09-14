
import NavbarLoginOut from "./navbar-login-out";
export default function Navbar() {
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
        <NavbarLoginOut text={"Login"} to={"/login"}/>
    </nav>
}