import My_Navbar from "../../navbar/my_Navbar";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {baseAxios, tokenAxios} from "../../../../function/global/axios-config";
import AnswerModal from "./answer-modal";
import Container from "react-bootstrap/Container";
export default function QuizPlay() {

    const [id, setId] = useState()
    const [url,setUrl] = useState()
    const [show,setShow] = useState(false);
    const [characterName, setCharacterName] = useState("");
    const location = useLocation();


    useEffect(() => {
        console.log(location);
        if (location.state !== null) {
            setId(location.state.id);
            loadImage(location.state.id);
        }
    }, [ location ])

    const loadImage = (stateId) =>{
        tokenAxios.post(`/quiz/${stateId}`)
            .then(response =>{
                setUrl(response.data.url);
                setCharacterName(response.data.chracterName);
            })
    }

    const showAnswer = () => {
        setShow(true);
    };

    //src는 mockup용으로 세워둠.
    return<>
    <My_Navbar></My_Navbar>
    <div className="quiz_background" onClick={showAnswer}>
        <img className="quiz_img m-0 m-auto" src={url}
             alt="..."/>
    </div>
        <AnswerModal _show={show} _setShow={setShow} _name={characterName}></AnswerModal>
    </>
};