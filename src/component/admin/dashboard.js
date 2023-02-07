import {Col, Form, Row} from "react-bootstrap";
import CustomGraph from "./customGraph";
import {GRAPH_TYPE} from "../../utils/constants";
import {useState} from "react";


export default function Dashboard() {

    const [date,setDate] = useState();


    const changed = (event) => {
        setDate(event.currentTarget.value)
    }

    return (
        <>

            <div className={"top-space"}>
                <div className={"insite-title flex-box justify-content-center align-items-center"}>
                    <span>기간 별 생성 수</span>
                    <Form.Control value={date} onChange={changed} type={"date"} className={"col-2"}/>
                </div>
                <Row className={"w-90 m-0 m-auto justify-content-between"}>
                    <Col lg={6}>
                        <div>
                            <CustomGraph date={date} type={GRAPH_TYPE.MEMBER}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <CustomGraph type={GRAPH_TYPE.QUIZ}/>
                    </Col>
                </Row>

                <hr className={"w-90 cus-divider"}/>
                <Row className={"w-90 m-0 m-auto justify-content-between"}>
                    <Col lg={6}>
                        <div>
                            <CustomGraph type={GRAPH_TYPE.COMMENT}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <CustomGraph type={GRAPH_TYPE.REPORT}/>
                    </Col>
                </Row>
            </div>

        </>
    );
}