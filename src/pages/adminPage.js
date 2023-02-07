import SideBar from "../component/admin/sidebar";
import Dashboard from "../component/admin/dashboard";
import {Col, Row} from "react-bootstrap";

export default function AdminPage() {

    return (
        <>

        <Row>
            <Col lg={2}>
            <SideBar/>
            </Col>
            <Col lg={10}>
                <Dashboard/>
            </Col>
        </Row>



        </>
)
}