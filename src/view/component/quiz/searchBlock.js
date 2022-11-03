import {Container, Button, Row, Col, Form} from "react-bootstrap";
import SearchTag from "./search_tag";

export default function SearchBlock() {
    return <>
        <Container>
            <Row className="row row-cols-6 row-cols-lg-auto">
                <Col className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-5">
                    <Button variant={"success"}>
                        인기순
                    </Button>
                    <Button variant={"light"}>
                        최신순
                    </Button>
                </Col>
                <Col className="col-6">
                    <Form.Control type="text" className="col-auto" placeholder="태그 추가"/>
                </Col>
               <SearchTag name={}></SearchTag>
            </Row>

            <Row className="row row-cols-auto">
                <Col className="col-10">
                    <Form.Control type="text" className="col-auto" placeholder="검색어를 입력하세요"/>
                </Col>
                <Col className="col-2">
                    <Button variant={"success"}>
                        검색
                    </Button>
                </Col>
            </Row>
        </Container>
    </>
};