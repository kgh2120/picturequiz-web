import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import SearchResult from "../quiz-add/search_result";
import {useEffect, useState} from "react";
import SearchTagList from "./search_tag_list";
import {searchCharacter, searchTag} from "../../../../function/fn_search";
import {baseAxios, tokenAxios} from "../../../../function/global/axios-config";

export default function SearchBlock({_setQuiz, _pageNum, _setPageNum}) {

    const [character_name, setCharacter_name] = useState();

    const [search_result, setSearchResult] = useState([])
    const [character, setCharacter] = useState();
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState("");
    const [orderState, setOrderState] = useState("POPULAR")

    const searchCharacterEvent = (event) => {
        searchCharacter(event, setCharacter_name, setSearchResult);
    }

    const searchTagEvent = (event) => {
        searchTag(event, setTags, setTagName, tags);
    }


    const changeTagName = (event) => {
        setTagName(event.target.value)
    }

    const logSelectedMenu = (event) => {
        let parsed = JSON.parse(event);
        setCharacter(parsed);
        setCharacter_name(parsed.name);
    }

    const defaultSearchCondition = {
        orderCondition: "POPULAR"
    }
    useEffect(() => {
        tokenAxios.post("/quiz", defaultSearchCondition)
            .then(response => {
                console.log(response)

                const result = {
                    quizzes: response.data.quizzes,
                    nextPageNum: response.data.nextPageNum,
                    hasNext: response.data.hasNext
                }
                _setQuiz(result);
            })

    }, [])

    //

    const changeOrderStateToPopular = () => {
        setOrderState("POPULAR");
    }
    const changeOrderStateToRecent = () => {
        setOrderState("RECENT");
    }

    const searchQuiz = () =>{
        //TODO backend security 변경 후 tokenAxios -> baseAxios로 변경하기

        let searchCondition = {
            orderCondition : orderState,
            answerName : character === undefined ? null : character.name,
            tagNames : tags.map(t => t.name),
            pageNum : _pageNum, // TODO pageNum 받아서 넘겨야 할 듯
        }

        tokenAxios.post("/quiz", searchCondition)
            .then(response => {
                console.log(response)

                const result = {
                    quizzes: response.data.quizzes,
                    nextPageNum: response.data.nextPageNum,
                    hasNext: response.data.hasNext
                }
                _setQuiz(result);
            })
    }

    return <>
        <Container className={"search_container"}>
            <Row className=" row row-cols-6 row-cols-lg-auto">
                <Col className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-5">

                    {orderState === "POPULAR" ? <>
                        <Button onClick={changeOrderStateToPopular} variant={"success"}>
                            인기순
                        </Button>
                        <Button onClick={changeOrderStateToRecent} variant={"light"}>
                            최신순
                        </Button></> : <>
                        <Button onClick={changeOrderStateToPopular} variant={"light"}>
                            인기순
                        </Button>
                        <Button onClick={changeOrderStateToRecent} variant={"success"}>
                            최신순
                        </Button></>}


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
                    <Button onClick={searchQuiz} variant={"success"} className={"small-font-btn"}>
                        검색
                    </Button>
                </Col>
            </Row>
        </Container>
    </>
};