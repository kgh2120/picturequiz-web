import QuizList from "./quiz_list";
import SearchBlock from "./searchBlock";
import My_Navbar from "../../navbar/my_Navbar";
import {useState} from "react";



export default function Main_quiz_list(){

    let quizData = {
        quizId : "",
        pictureUrl:"",
        authorNickname:"",
        characterName:"",
        tagNames:[]
    }

    const [quiz, setQuiz] = useState({
        quizzes : [quizData],
        nextPageNum : 0,
        hasNext : true
    })

    return <>
        <My_Navbar></My_Navbar>
        <SearchBlock _setQuiz={setQuiz}></SearchBlock>
        <QuizList _quiz={quiz}></QuizList>

    </>
}