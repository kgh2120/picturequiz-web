import My_Navbar from "../../navbar/my_Navbar";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {baseAxios} from "../../../utils/global/axios-config";
import AnswerModal from "./answer-modal";
import {handleError} from "../../../utils/global/exception/global-exception-handler";

export default function QuizPlay() {

    const [id, setId] = useState()
    const [url,setUrl] = useState()
    const [show,setShow] = useState(false);
    const [characterName, setCharacterName] = useState("");
    const location = useLocation();


    useEffect(() => {
        if (location.state !== null) {
            setId(location.state.id);
            loadImage(location.state.id);
        }
    }, [ location ])

    const loadImage = (stateId) =>{
        baseAxios.post(`/quiz/${stateId}`)
            .then(response =>{
                setUrl(response.data.url);
                setCharacterName(response.data.characterName);
            }).catch(err => {
                handleError(err)
        })
    }

    const showAnswer = () => {
        setShow(true);
    };

    const loadingImage = () => {
        const img = document.querySelector('.quiz_img');
        const spinner = document.querySelector('.loading_spinner');
        img.style.display = 'block';
        spinner.style.display = 'none';
    }


    return<>
    <My_Navbar></My_Navbar>
    <div className="quiz_background" onClick={showAnswer}>
        <img onLoad={loadingImage} className="quiz_img m-0 m-auto" src={url}
             alt="..."/>
        <div className="loading_spinner spinner-border text-light m-0 m-auto" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
        <AnswerModal _show={show} _setShow={setShow} _name={characterName}></AnswerModal>
    </>
};