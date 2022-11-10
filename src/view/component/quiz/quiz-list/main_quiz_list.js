import QuizList from "./quiz_list";
import SearchBlock from "./searchBlock";
import My_Navbar from "../../navbar/my_Navbar";
import {useState} from "react";



export default function Main_quiz_list(){

    const [currentPageNum, setCurrentPageNum] = useState(0)

    const [quiz, setQuiz] = useState({
        quizzes : [],
        nextPageNum : 0,
        hasNext : true
    })

    return <>
        <My_Navbar></My_Navbar>
        <SearchBlock _setQuiz={setQuiz} _pageNum={currentPageNum} _setPageNum={setCurrentPageNum}></SearchBlock>
        <QuizList _quiz={quiz}></QuizList>

    </>
}