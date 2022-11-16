import QuizList from "./quiz_list";
import {tokenAxios} from "../../../utils/global/axios-config";
import {useEffect, useState} from "react";
import My_Navbar from "../../navbar/my_Navbar";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";

export default function MyQuizList() {

    const navigate = useNavigate();
    const [pageNum,setPageNum] = useState(0);
    const [quiz, setQuiz] = useState({
        quizzes : [],
        nextPageNum : 0,
        hasNext : true
    })

    useEffect(() => {
        tokenAxios.get(`/quiz/my?pageNum=${pageNum}`)
            .then((response) => {
                const result = {
                    quizzes: response.data.quizzes,
                    nextPageNum: response.data.nextPageNum,
                    hasNext: response.data.hasNext
                }
                setQuiz(result);
            }).catch(err => {
                if(err.response.status===404) {
                    alert("내가 업로드한 퀴즈가 없습니다. 메인 화면으로 이동합니다.")
                    navigate("/",{replace: true});
                }
        })
    }, []);


    return <>
        <My_Navbar></My_Navbar>
        <Container className={"mt-3"}>
            <h4>내가 만든 퀴즈</h4>
        </Container>
        <QuizList _quiz={quiz}></QuizList>
    </>
}