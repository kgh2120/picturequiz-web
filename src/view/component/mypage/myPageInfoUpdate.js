import {Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import ModalButton from "./modalButton";


export default function MyPageInfoUpdate({_id, _nickname, _mail, _setNickname}) {



    return <>
        <div>
            <Row className={"justify-content-md-center  my-page-update-info"}>
                <Col sm={3} className={"nav_text_korean"}>
                    <span>아이디</span>
                </Col>
                <Col sm={3}>
                    <span>{_id}</span>
                </Col>
            </Row>
        </div>

        <Row className={"justify-content-md-center  my-page-update-info"}>
            <Col sm={3} className={"nav_text_korean"}>
                <span>닉네임</span>
            </Col>
            {_nickname !== null ?
                <>
                <Col sm={3}>
                    <span>{_nickname}</span>
                </Col>
                </> : <>
                    <Col sm={3}>
                        <ModalButton changeState={_setNickname} mode={"nickname"}/>
                    </Col>
                </>
            }
        </Row>

        <Row className={"justify-content-md-center  my-page-update-info"}>
            <Col sm={3} className={"nav_text_korean"}>
                <span>이메일</span>
            </Col>
            {_mail !== null ?
                <>
                    <Col sm={3}>
                        <span>{_mail}</span>
                    </Col>
                </> : <>
                    <Col sm={3}>
                        <ModalButton mode={"mail"}/>
                    </Col>
                </>
            }
        </Row>

        <Row className={"justify-content-md-center  my-page-update-info"}>
            <Col sm={3} className={"nav_text_korean"}>
                <span>비밀번호</span></Col>
                    <Col sm={3}>
                        <ModalButton mode={"password"}/>
                    </Col>
        </Row>
    </>
};