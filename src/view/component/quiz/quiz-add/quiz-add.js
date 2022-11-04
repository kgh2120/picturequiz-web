import {Container, Button, Form} from "react-bootstrap";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

export default function QuizAdd() {
    return <>

        <Container>
            <div>
                <h4>퀴즈 등록하기</h4>
            </div>
            <div>
                <input type="file"/>
                    <div className="upload-box  m-0 m-auto">
                        <div className="uploader">
                            <div>
                                <faUpload className="btn big-icon"></faUpload>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Form.Control type="text" placeholder="캐릭터 이름을 입력하세요"/>
                                <Form.Control type="text" placeholder="태그를 입력하세요"/>
                            </div>
                            <div className="flex-box">
                                {/* js로 태그가 추가 되면 태그 버튼을 추가하는 식으로 설정하기.*/}
                                {/*<button className="btn btn-success tag">태그1</button>*/}
                                {/*<button className="btn btn-success tag">태그2</button>*/}
                                {/*<button className="btn btn-success tag">태그3</button>*/}
                                {/*<button className="btn btn-success tag">태그3</button>*/}
                                {/*<button className="btn btn-success tag">태그3</button>*/}
                            </div>
                            <div className="row-cus">
                                <Button variant={"success"} className="w-50">등록하기</Button>
                                <Button variant={"danger"} className="w-50">취소하기</Button>
                            </div>
                        </div>
                    </div>
            </div>
        </Container>


    </>
};