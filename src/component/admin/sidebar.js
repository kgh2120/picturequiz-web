import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBullhorn, faClipboard, faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {Dropdown} from "react-bootstrap";

export default function SideBar(){
    return (
        <>
        <div className={"side-bar"}>

            {/* Logo Area*/}
            <div className={"admin-logo-area"}>
                <div className={'admin-logo-text'}>Admin Page</div>
            </div>
            <hr className={"admin-hr"}/>

            <div  className={"admin-nav-item pointer"}>
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
                        <Dropdown.Item href="#/action-1">관리자 목록</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">관리자 생성</Dropdown.Item>
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
                        <Dropdown.Item href="#/action-1">접수된 신고</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">신고 당한 게시글</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <hr className={"admin-hr"}/>

            <div className={"admin-nav-item pointer"}>
                    <FontAwesomeIcon className={"mr-3"} icon={faUser}/>
                    <span className={"mr-3"}>회원 조회</span>
            </div>

        </div>

        </>
    )
}