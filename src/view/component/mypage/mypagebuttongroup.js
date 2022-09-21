import {Button, Col, Row} from "react-bootstrap";

export default function Mypagebuttongroup({_mode}) {

    return <div className={"my-page_content "}>

            <div className={"my-page_content_button_area"}>      <Row className={"justify-content-md-center"}>
                {_mode !== "update" ? <>
                    <Col sm={3} className={"my-page_content_button_col"}>
                        <Button href={"/my-page/update"} variant={"warning"}
                                className={"my-page_content_button  my-page_content_button_edit"}>정보 변경</Button>
                    </Col>
                    <Col sm={3} className={"my-page_content_button_col"}>
                        <Button variant={"danger"}
                                className={"my-page_content_button my-page_content_button_delete"}>탈퇴하기</Button>
                    </Col></> : <>
                    <Col sm={3} className={"my-page_content_button_col"}>
                        <Button href={"/"} variant={"warning"}
                                className={"my-page_content_button  my-page_content_button_edit"}>홈 으로</Button></Col>
                    <Col sm={3} className={"my-page_content_button_col"}>
                        <Button variant={"danger"} href={"/my-page"}
                                className={"my-page_content_button my-page_content_button_delete"}>취소하기</Button></Col></>
                }
            </Row></div>

    </div>
};