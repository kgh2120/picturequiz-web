import SideBar from "../component/admin/sidebar";
import Dashboard from "../component/admin/dashboard";
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import {ADMIN_MODE} from "../utils/constants";
import AdminList from "../component/admin/adminList";

export default function AdminPage() {

    const  [mode,setMode] = useState(ADMIN_MODE.DASH_BOARD);

    const createContent = () => {
        switch (mode){
            case ADMIN_MODE.DASH_BOARD:
                return <Dashboard/>;
            case ADMIN_MODE.ADMIN_LIST:
                return <AdminList/>;
            case ADMIN_MODE.ADMIN_CREATE:
                return null;
            case ADMIN_MODE.REPORT_LIST:
                return null;
            case ADMIN_MODE.REPORT_TARGET_LIST:
                return null;
            case ADMIN_MODE.MEMBER_LIST:
                return null;
        }
    }

    return (
        <>

        <Row>

            <SideBar _setMode={setMode}/>

            <Col >
                {createContent()}
            </Col>
        </Row>



        </>
)
}