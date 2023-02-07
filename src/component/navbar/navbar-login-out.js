import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";


export default function NavbarLoginOut({_mode, _setMode}) {
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("access-token")
        _setMode(false)
        navigate("/")

    }
    return<>

        {_mode ?
            <>
            <div className={"navbar_user_area"} >
                <FontAwesomeIcon icon={faCircleInfo} />
                <Link to={"/my-pagenum"}><span className={"navbar_user_area_info"}>내 정보</span></Link>
            </div>
            <div className={"navbar_user_area"}>
                <FontAwesomeIcon icon={faSignIn} />
                <span onClick={logout} className={"navbar_user_area_text"}>log out</span>
            </div>
            </>
            : <div className={"navbar_user_area"}>
                <FontAwesomeIcon icon={faSignIn} />
                <Link to={"/login"} style={{textDecoration: 'none'}}><span className={"navbar_user_area_text"}>log in</span></Link>
            </div>}
    </>



}