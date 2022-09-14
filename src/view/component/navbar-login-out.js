import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default function NavbarLoginOut({text, to}) {
    return <div className={"navbar_user_area"}>
        <FontAwesomeIcon icon={faSignIn} />
        <Link to={to} style={{textDecoration: 'none'}}><span className={"navbar_user_area_text"}>{text}</span></Link>
    </div>
}