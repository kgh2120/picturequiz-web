import {Col, Row} from "react-bootstrap";

export default function Mypageinforead({id, nickname, mail}) {
    return <>
        <div className={"my-page_content_area"}>
            <div className={"my-page_content"}>
                <Row>
                    <Col sm={4} className={"my-page_content_label_area"}>
                        <span className={"my-page_content_label"}>아이디</span>
                    </Col>
                    <Col sm={8}>
                        <div className={"my-page_content_input"}>{id}</div>
                    </Col>
                </Row>
            </div>

            <div className={"my-page_content"}>
                <Row>
                    <Col sm={4} className={"my-page_content_label_area"}>
                        <span className={"my-page_content_label"}>닉네임</span>
                    </Col>
                    {
                        nickname !== null ?
                            <Col sm={8}>
                                <div className={"my-page_content_input"}>{nickname}</div>
                            </Col> :
                            <Col sm={8}>
                                <div className={"my-page_content_input page_content_input_not_setting"}>닉네임이 설정되어 있지
                                    않습니다.
                                </div>
                            </Col>
                    }
                </Row>
            </div>
            <div className={"my-page_content"}>
                <Row>
                    <Col sm={4} className={"my-page_content_label_area"}    >
                        <span className={"my-page_content_label"}>인증 메일</span>
                    </Col>
                    {
                        mail !== null ?
                            <Col sm={8}>
                                <div className={"my-page_content_input"}>{mail}</div>
                            </Col> :
                            <Col sm={8}>
                                <div className={"my-page_content_input page_content_input_not_setting"}>인증 메일이 설정되어있지
                                    않습니다.
                                </div>
                            </Col>
                    }
                </Row>
            </div>
        </div>
    </>
};