import {Button, Container, Form} from "react-bootstrap";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import My_Navbar from "../../navbar/my_Navbar";

import SearchTagList from "../quiz-list/search_tag_list";
import {searchCharacter, searchTag} from "../../../utils/fn_search";
import {baseAxios, healthCheck} from "../../../utils/global/axios-config";
import CharacterSearchForm from "./character_search_form";
import TagSearchForm from "./tag_search_form";
import {getAccessToken} from "../../../utils/global/token";
import {handleConnectionError, handleFileNotFoundError} from "../../../utils/global/exception/global-exception-handler";
import {useNavigate} from "react-router-dom";
import {nav_home} from "../../../utils/global/url";


export default function QuizAdd() {

    const navigate = useNavigate();
    const [characterName, setCharacterName] = useState("");
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState("");
    const [tagErrorShow, setTagErrorShow] = useState(false)
    const [tagErrorMessage, setTagErrorMessage] = useState("");

    const searchCharacterEvent = (event) => {
        setCharacterName(event.target.value);
    }

    const searchTagEvent = (event) => {
        searchTag(event, setTags, setTagName, tags, setTagErrorShow, setTagErrorMessage);
    }


    const changeTagName = (event) => {
        setTagName(event.target.value)
    }
    const registerQuiz = () => {
        let fileInput = document.getElementById("input_upload");
        const file = fileInput.files[0];

        if (file === undefined || characterName === "") {
            alert("업로드 할 사진과, 캐릭터를 선택해주세요");
            return;
        }
        if (file.size > 10485760) {
            alert("업로드 할 파일은 10MB 이하로 설정해주세요");
            return;
        }
        
        const body = {
            characterName,
            tagNames: tags.map(t => t.name)
        };
        let formData = new FormData();
        formData.append("image", file);
        const blob = new Blob([JSON.stringify(body)], {type: "application/json"});
        formData.append("quiz", blob);

        baseAxios.post("/quiz/add",
            formData
            , {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": `Bearer ${getAccessToken()}`
                }
            }
        ).then(() => {
            moveToMain();
        }).catch((err) => {
                if (err?.response?.data?.errorMessage !== undefined) {
                    alert(err?.response?.data?.errorMessage)
                } else {
                    console.log(err)
                    healthCheck()
                        .catch(error => {
                            console.log(error)
                            if (error.response.status === 0)
                                handleConnectionError(error);
                            else {
                                handleFileNotFoundError();
                            }
                        });
                }
            }
        )
    }

    const uploadImage = () => {
        let file = document.getElementById("input_upload");
        file.click();
    }

    function clearBox(box, beforeImg) {
        box.removeChild(beforeImg);
        document.getElementById("upload_icon").setAttribute("style", "display : block");
    }

    const changeUploadBoxImage = (e) => {


        let beforeImg = document.querySelector(".uploader img");
        let box = document.querySelector("div.uploader");

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.setAttribute("src", e.target.result);
            img.setAttribute("class", "thumnail");
            document.getElementById("upload_icon").setAttribute("style", "display : none");
            try {
                box.removeChild(beforeImg);
            } catch (err) {
            }
            box.appendChild(img);
        }
        if (e.target.files[0] !== undefined) {
            if(e.target.files[0].size >10485760 ){
                const dataTranster = new DataTransfer();
                e.target.files = dataTranster.files;
                alert("업로드 할 파일은 10MB 이하로 설정해주세요");
                if (beforeImg !== undefined && beforeImg !== null) {
                    clearBox(box, beforeImg);
                }
                return;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            clearBox(box, beforeImg);
        }
    }

    const moveToMain = () => {
        navigate(nav_home(), {replace: true});
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

                            <CharacterSearchForm
                                _character_name={characterName}
                                _searchCharacterEvent={searchCharacterEvent}/>

                            <TagSearchForm changeTagName={changeTagName}
                                           searchTagEvent={searchTagEvent}
                                           tagName={tagName}
                                           _tagErrorShow={tagErrorShow} _tagErrorMessage={tagErrorMessage}/>
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
}