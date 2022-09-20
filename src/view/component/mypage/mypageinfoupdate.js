import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import button from "bootstrap/js/src/button";
import Modalbutton from "./modalbutton";


export default function Mypageinfoupdate({id, nickname, mail}) {



    return <>
        <div>
            <Row className={"justify-content-md-center  my-page-update-info"}>
                <Col sm={3} className={"nav_text_korean"}>
                    <span>아이디</span>
                </Col>
                <Col sm={3}>
                    <span>{id}</span>
                </Col>
            </Row>
        </div>

        <Row className={"justify-content-md-center  my-page-update-info"}>
            <Col sm={3} className={"nav_text_korean"}>
                <span>닉네임</span>
            </Col>
            {nickname !== null ?
                <>
                <Col sm={3}>
                    <span>{nickname}</span>
                </Col>
                </> : <>
                    <Col>
                        <Modalbutton mode={"nickname"}/>
                    </Col>
                </>
            }
        </Row>

        <Row className={"justify-content-md-center  my-page-update-info"}>
            <Col sm={3} className={"nav_text_korean"}>
                <span>이메일</span>
            </Col>
            {mail !== null ?
                <>
                    <Col sm={3}>
                        <span>{mail}</span>
                    </Col>
                </> : <>
                    <Col sm={3}>
                        <Modalbutton mode={"mail"}/>
                    </Col>
                </>
            }
        </Row>

        <Row className={"justify-content-md-center  my-page-update-info"}>
            <Col sm={3} className={"nav_text_korean"}>
                <span>비밀번호</span></Col>
                    <Col sm={3}>
                        <Modalbutton mode={"password"}/>
                    </Col>
        </Row>
    </>
};