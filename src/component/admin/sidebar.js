import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBullhorn, faClipboard, faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {Dropdown} from "react-bootstrap";
import {ADMIN_MODE} from "../../utils/constants";

export default function SideBar({_setMode}){

    const dashboardAreaClicked = () =>{
        _setMode(ADMIN_MODE.DASH_BOARD)
    }
    const memberListAreaClicked = () => {
        _setMode(ADMIN_MODE.MEMBER_LIST)
    }
    const reportTargetListAreaClicked = () => {
        _setMode(ADMIN_MODE.REPORT_TARGET_LIST)
    }
    const reportListAreaClicked = () => {
        _setMode(ADMIN_MODE.REPORT_LIST)
    }
    const adminListAreaClicked = () => {
        _setMode(ADMIN_MODE.ADMIN_LIST)
    }
    const adminCreateAreaClicked = () => {
        _setMode(ADMIN_MODE.ADMIN_CREATE)
    }


    return (
        <>
        <div className={"side-bar"}>

            {/* Logo Area*/}
            <div  className={"admin-logo-area"}>
                <div className={'admin-logo-text'}>Admin Page</div>
            </div>
            <hr className={"admin-hr"}/>

            <div onClick={dashboardAreaClicked} className={"admin-nav-item pointer"}>
                <FontAwesomeIcon className={"mr-3"} icon={faClipboard}/>
                <span>대시보드</span>
            </div>

            <hr className={"admin-hr"}/>

            <div className={"admin-nav-item"}>
                <Dropdown>
                    <FontAwesomeIcon className={"mr-3"} icon={faUserSecret}/>
                    <span className={"mr-3"}>관리자 관리</span>
                    <Dropdown.Toggle className={"pointer"} as={"span"}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={adminListAreaClicked}>관리자 목록</Dropdown.Item>
                        <Dropdown.Item onClick={adminCreateAreaClicked}>관리자 생성</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <hr className={"admin-hr"}/>

            <div className={"admin-nav-item"}>
                <Dropdown>
                    <FontAwesomeIcon className={"mr-3"} icon={faBullhorn}/>
                    <span className={"mr-3"}>신고 관리</span>
                    <Dropdown.Toggle className={"pointer"} as={"span"}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={reportListAreaClicked}>접수된 신고</Dropdown.Item>
                        <Dropdown.Item onClick={reportTargetListAreaClicked}>신고 당한 게시글</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <hr className={"admin-hr"}/>

            <div onClick={memberListAreaClicked} className={"admin-nav-item pointer"}>
                    <FontAwesomeIcon className={"mr-3"} icon={faUser}/>
                    <span className={"mr-3"}>회원 조회</span>
            </div>

        </div>

        </>
    )
}