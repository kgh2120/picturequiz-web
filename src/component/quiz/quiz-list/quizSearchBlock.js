import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import SearchTagList from "./search_tag_list";
import {searchTag} from "../../../utils/fn_search";
import {baseAxios} from "../../../utils/global/axios-config";
import CharacterSearchForm from "../quiz-add/character_search_form";
import TagSearchForm from "../quiz-add/tag_search_form";

export default function QuizSearchBlock({_setSearchCondition}) {

    const [characterName, setCharacterName] = useState("");
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState("");
    const [orderState, setOrderState] = useState("POPULAR")
    const [tagErrorShow, setTagErrorShow] = useState(false)
    const [tagErrorMessage, setTagErrorMessage] = useState("");
    //생존
    const searchCharacterEvent = (event) => {
        setCharacterName(event.target.value)
    }
    //생존
    const searchTagEvent = (event) => {
        searchTag(event, setTags, setTagName, tags,setTagErrorShow,setTagErrorMessage);
    }
    //생존
    const clearSearchCondition = () => {
        setCharacterName("");
        setTags([]);
        setTagName("");
    }
    //생존
    const changeTagName = (event) => {
        setTagName(event.target.value)
    }
    const changeOrderStateToPopular = () => {
        setOrderState("POPULAR");
        _setSearchCondition(prevCondition =>{
            return{...prevCondition, orderCondition: "POPULAR"}
        })
    }
    const changeOrderStateToRecent = () => {
        setOrderState("RECENT");
        _setSearchCondition(prevCondition =>{
            return{...prevCondition, orderCondition: "RECENT"}
        })
    }
    // 거의 삭제
    // searchCondition을 state들로 바꿔주고, 그 다음에 여기서 유지하는 state를 초기화 시켜주기.
    const changeSearchCondition = () => {
        _setSearchCondition(prev => {
            return {...prev, answerName: characterName, tagNames : tags.map(t => t.name), pageNum : 0}
        })
        clearSearchCondition();
    }


    return <>
        <Container className={"search_container"}>
            <Row className=" row row-cols-6 row-cols-lg-auto">
                <Col className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">

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
                    <TagSearchForm changeTagName={changeTagName}
                                   searchTagEvent={searchTagEvent}
                                   tagName={tagName}
                    _tagErrorShow={tagErrorShow} _tagErrorMessage={tagErrorMessage}/>

                </Col>
                <SearchTagList _setTags={setTags} _tags={tags}></SearchTagList>
            </Row>

            <Row className="mt-3 row row-cols-auto">
                <Col className="col-9">
                    <CharacterSearchForm
                        _character_name={characterName}
                        _searchCharacterEvent={searchCharacterEvent}/>
                </Col>
                <Col className="col-3">
                    <Button onClick={changeSearchCondition} variant={"success"} className={"small-font-btn"}>
                        검색
                    </Button>
                </Col>
            </Row>
        </Container>
    </>
};