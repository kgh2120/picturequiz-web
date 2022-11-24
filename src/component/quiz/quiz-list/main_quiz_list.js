import QuizList from "./quiz_list";
import QuizSearchBlock from "./quizSearchBlock";
import My_Navbar from "../../navbar/my_Navbar";
import {useEffect, useState} from "react";
import {autoLogin, getAccessToken, getRefreshToken} from "../../../utils/global/token";
import {baseAxios} from "../../../utils/global/axios-config";



export default function Main_quiz_list(){

    const [currentPageNum, setCurrentPageNum] = useState(0)
    const[searchCondition, setSearchCondition] = useState({
        pageNum : 0,
        answerName : "",
        orderCondition : "POPULAR",
        tagNames : []
    });
    const [quiz, setQuiz] = useState({
        quizzes : [],
        nextPageNum : 0,
        hasNext : true
    })
    useEffect(() => {
        if (!getAccessToken() && getRefreshToken()) {
            autoLogin();
        }
    }, [])

    const searchQuiz = () => {
        console.log(searchCondition)
        baseAxios.post("/quiz", searchCondition)
            .then(response => {
                console.log(response)
                const result = {
                    quizzes: response.data.quizzes,
                    nextPageNum: response.data.nextPageNum,
                    hasNext: response.data.hasNext,
                }
                setQuiz(result);
            }).catch(err => {
            alert("검색 결과가 없습니다.");
        })
    }

    useEffect(() => {
        searchQuiz()
    },[searchCondition])

    return <>
        <My_Navbar></My_Navbar>
        <QuizSearchBlock _setSearchCondition={setSearchCondition}></QuizSearchBlock>
        <QuizList _quiz={quiz} _setQuiz={setQuiz}></QuizList>

    </>
}