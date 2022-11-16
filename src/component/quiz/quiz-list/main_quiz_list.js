import QuizList from "./quiz_list";
import QuizSearchBlock from "./quizSearchBlock";
import My_Navbar from "../../navbar/my_Navbar";
import {useEffect, useState} from "react";
import {autoLogin, getAccessToken} from "../../../utils/global/token";



export default function Main_quiz_list(){

    const [currentPageNum, setCurrentPageNum] = useState(0)
    const [token, setToken] = useState();

    const [quiz, setQuiz] = useState({
        quizzes : [],
        nextPageNum : 0,
        hasNext : true
    })
    useEffect(() => {
        if (!getAccessToken()) {
            autoLogin();

        }
        console.log("app initialized")
    }, [])




    return <>
        <My_Navbar></My_Navbar>
        <QuizSearchBlock _setQuiz={setQuiz} _pageNum={currentPageNum} _setPageNum={setCurrentPageNum}></QuizSearchBlock>
        <QuizList _quiz={quiz}></QuizList>

    </>
}