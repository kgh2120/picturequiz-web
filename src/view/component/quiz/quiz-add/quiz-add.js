import {Container, Button, Form, Col, Navbar} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import axios from "axios";
import My_Navbar from "../../navbar/my_Navbar";
import SearchResult from "./search_result";
import {forEach} from "react-bootstrap/ElementChildren";
import {isElementOfType} from "react-dom/test-utils";


export default function QuizAdd() {

    const [character_name, setCharacter_name] = useState();

    const [search_result, setSearchResult] = useState([])
    const [character,setCharacter] = useState();


    const searchCharacter = (event) => {
        let data = event.target.value;
        setCharacter_name(data);
        console.log(data);
        axios.get(`http://localhost:8080/character?name=${data}`)
            .then(response => {
                if(response.data.length != 0)
                    setSearchResult(response.data);
                if(data==="" || data===" ")
                    setSearchResult([]);
            })
    }

    const logSelectedMenu = (event) =>{

        let parsed = JSON.parse(event);
        setCharacter(parsed);
        console.log(character)
        setCharacter_name(parsed.name);

    }

    return <>
        <My_Navbar></My_Navbar>
        <Container>
            <div>
                <h4>퀴즈 등록하기</h4>
            </div>
            <div>
                <input type="file"/>
                <div className="upload-box  m-0 m-auto">
                    <div className="uploader">
                        <div>
                            <FontAwesomeIcon icon={faUpload} className="btn big-icon"></FontAwesomeIcon>
                        </div>
                    </div>
                    <div>
                        <div className={"character_box"}>
                            <Dropdown onSelect={logSelectedMenu}>
                                <Dropdown.Toggle  as={Form.Control} onChange={searchCharacter} value={character_name}
                                                 type="text" placeholder="캐릭터 이름을 입력하세요"
                                />
                                <SearchResult r={search_result}></SearchResult>
                            </Dropdown>

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