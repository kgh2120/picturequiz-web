import {Container, Button, Row, Col, Form} from "react-bootstrap";
import SearchTag from "./search_tag";
import Dropdown from "react-bootstrap/Dropdown";
import SearchResult from "../quiz-add/search_result";
import {useState} from "react";
import axios from "axios";
import SearchTagList from "./search_tag_list";
import {searchCharacter, searchTag} from "../../../../function/fn_search";

export default function SearchBlock() {

    const [character_name, setCharacter_name] = useState();

    const [search_result, setSearchResult] = useState([])
    const [character, setCharacter] = useState();
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState("");

    const searchCharacterEvent = (event) => {
        searchCharacter(event,setCharacter_name,setSearchResult);
    }

    const searchTagEvent = (event) => {
        searchTag(event,setTags,setTagName,tags);
    }


    const changeTagName = (event) => {
        setTagName(event.target.value)
    }

    const logSelectedMenu = (event) => {
        let parsed = JSON.parse(event);
        setCharacter(parsed);
        setCharacter_name(parsed.name);

    }


    return <>
        <Container className={"search_container"}>
            <Row className=" row row-cols-6 row-cols-lg-auto">
                <Col className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-5">
                    <Button variant={"success"}>
                        인기순
                    </Button>
                    <Button variant={"light"}>
                        최신순
                    </Button>
                </Col>
                <Col className="col-6">
                    <Form.Control onChange={changeTagName} onKeyUp={searchTagEvent} value={tagName} type="text"
                                  className="col-auto" placeholder="태그 추가"/>
                </Col>
                <SearchTagList _setTags={setTags} _tags={tags}></SearchTagList>
            </Row>

            <Row className="mt-3 row row-cols-auto">
                <Col className="col-10">
                    <Dropdown onSelect={logSelectedMenu}>
                        <Dropdown.Toggle as={Form.Control} onChange={searchCharacterEvent} value={character_name}
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