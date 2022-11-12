import {Container, Button, Form, Col, Navbar} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import axios from "axios";
import My_Navbar from "../../navbar/my_Navbar";
import CharacterSearchResult from "./character_search_result";
import {forEach} from "react-bootstrap/ElementChildren";
import {isElementOfType} from "react-dom/test-utils";
import SearchTagList from "../quiz-list/search_tag_list";
import {searchCharacter, searchTag} from "../../../utils/fn_search";
import {baseAxios} from "../../../utils/global/axios-config";


export default function QuizAdd() {

    const [character_name, setCharacter_name] = useState("");

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
        console.log(character)
        setCharacter_name(parsed.name);

    }

    const registerQuiz = () => {
        let fileInput = document.getElementById("input_upload");
        const file = fileInput.files[0];


        if (file === undefined || character === undefined) {
            alert("업로드 할 사진과, 캐릭터를 선택해주세요");
            return;
        }


        const body = {
            characterId: character.characterId,
            tagNames: tags.map(t => t.name)
        };

        let formData = new FormData();
        formData.append("image", file);
        const blob = new Blob([JSON.stringify(body)], {type: "application/json"});
        formData.append("quiz", blob);

        const token = localStorage.getItem("access-token");
        baseAxios.post("/quiz/add",
            formData
            , {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(response => {
            moveToMain();
        })
    }

    const uploadImage = () => {
        let file = document.getElementById("input_upload");
        file.click();
    }

    const changeUploadBoxImage = (e) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = document.createElement("img");
            img.setAttribute("src", e.target.result);
            img.setAttribute("class", "thumnail");
            document.getElementById("upload_icon").setAttribute("style", "display : none");
            let beforeImg = document.querySelector(".uploader img");

            let box = document.querySelector("div.uploader");
            try {
                box.removeChild(beforeImg);
            } catch (err) {
            }
            box.appendChild(img);
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    const moveToMain = () => {
        window.location.replace("/");
    }

    return <>
        <My_Navbar></My_Navbar>
        <Container>

            <div>

                <input type="file" id={"input_upload"} onChange={changeUploadBoxImage} accept='image/*'/>
                <div className="upload-box  m-0 m-auto">
                    <div className={"quiz_add_header"}>
                        <h4>퀴즈 등록하기</h4>
                    </div>
                    <div className="uploader" onClick={uploadImage}>
                        <div>
                            <FontAwesomeIcon id={"upload_icon"} icon={faUpload}
                                             className="btn big-icon"></FontAwesomeIcon>
                        </div>
                    </div>
                    <div>
                        <div className={"character_box"}>
                            <Dropdown onSelect={logSelectedMenu}>
                                <Dropdown.Toggle as={Form.Control} onChange={searchCharacterEvent} value={character_name}
                                                 type="text" placeholder="캐릭터 이름을 입력하세요"
                                />
                                <CharacterSearchResult r={search_result}></CharacterSearchResult>
                            </Dropdown>

                            <Form.Control onChange={changeTagName} onKeyUp={searchTagEvent} value={tagName} type="text"
                                          placeholder="태그를 추가하세요"/>
                        </div>
                        <div>
                            <SearchTagList _setTags={setTags} _tags={tags}></SearchTagList>
                        </div>
                        <div className="row-cus">
                            <Button onClick={registerQuiz} variant={"success"} className="w-50">등록하기</Button>
                            <Button onClick={moveToMain} variant={"danger"} className="w-50">취소하기</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>


    </>
};