import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faUpload} from "@fortawesome/free-solid-svg-icons";
import CharacterSearchForm from "../quiz/quiz-add/character_search_form";
import TagSearchForm from "../quiz/quiz-add/tag_search_form";
import SearchTagList from "../quiz/quiz-list/search_tag_list";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {baseAxios} from "../../utils/global/axios-config";
import Tag from "../quiz/tag/tag";
import {useNavigate} from "react-router-dom";
import {handleError} from "../../utils/global/exception/global-exception-handler";

export default function CommunityQuizBlock({id}){
    const navigate = useNavigate();

    const [quiz,setQuiz] = useState({
        quizId : "",
        pictureUrl : "",
        characterName : "",
        tags : []
    });

    useEffect(()=>{
        baseAxios.get(`/quiz/${id}`)
            .then(res =>
                setQuiz({
                    quizId: res.data.quizId,
                    pictureUrl: res.data.pictureUrl,
                    characterName: res.data.characterName,
                    tags : res.data.tags
                })
            ).catch(err => handleError(err))

    },[id])

    const play_quiz = () => {
        navigate('/quiz/play',{
            state : {
                id
            }
        })
    }
    const tag_field= () =>{
        if(quiz.tags.length === 0)
            return;

        return <div className={"flex-box form-control tag_area"}>
            {quiz.tags.map(t => {
                return  <div className="comu_tag tag_font" style={{backgroundColor : t.color}}>{t.name}</div>
            })}
        </div>
    }

    return (
        <>
        <div>
            <div className={"card_block"}>
                <img className={"card_img"} src={quiz.pictureUrl}/>
            </div>
            <Form.Control
                readOnly={true}
                value={quiz.characterName}
            />
            {tag_field()}
            <div>
                <Button onClick={play_quiz} variant={"success"} href="#" className="block_btn_area w-100 "><FontAwesomeIcon icon={faPlay}/></Button>
            </div>
        </div>

            <hr/>

        </>

    )
}