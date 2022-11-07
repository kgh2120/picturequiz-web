import {Container, Button, Row, Col, Form} from "react-bootstrap";
import SearchTag from "./search_tag";
import Dropdown from "react-bootstrap/Dropdown";
import SearchResult from "../quiz-add/search_result";
import {useState} from "react";
import axios from "axios";

export default function SearchBlock() {

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
               {/*<SearchTag name={}></SearchTag>*/}
            </Row>

            <Row className="row row-cols-auto">
                {/*캐릭터 이름 입력하기*/}
                <Col className="col-10">
                    <Dropdown onSelect={logSelectedMenu}>
                        <Dropdown.Toggle  as={Form.Control} onChange={searchCharacter} value={character_name}
                                          type="text" placeholder="캐릭터 이름을 입력하세요"
                        />
                        <SearchResult r={search_result}></SearchResult>
                    </Dropdown>
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