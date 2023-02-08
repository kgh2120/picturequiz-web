import QuizList from "./quiz_list";
import {tokenAxios} from "../../../utils/global/axios-config";
import {useEffect, useState} from "react";
import My_Navbar from "../../navbar/my_Navbar";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";
import {handleError} from "../../../utils/global/exception/global-exception-handler";
import {useInView} from "react-intersection-observer";

export default function MyQuizList() {

    const navigate = useNavigate();
    const [ref, inView] = useInView()
    const [hasNext, setHasNext] = useState();
    const [pageNum,setPageNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState([])

    function searchMyQuiz() {
        setLoading(true)
        tokenAxios.get(`/quiz/my?pageNum=${pageNum}`)
            .then((response) => {
                if (response.data.hasNext)
                    response.data.quizzes.pop();
                setQuiz(prev => [...prev, response.data.quizzes]);
                setPageNum(response.data.nextPageNum);
                setHasNext(response.data.hasNext);
            }).catch(err => {
            handleError(err)
            if (err.response.status === 404) {
                navigate("/", {replace: true});
            }
        })
        setLoading(false)
    }

    useEffect(() => {
        searchMyQuiz();
    }, []);

    useEffect(() => {
        if (inView && !loading && hasNext) {
            searchMyQuiz()
        }
    }, [inView])


    return <>
        <My_Navbar></My_Navbar>
        <Container className={"mt-3"}>
            <h4>내가 만든 퀴즈</h4>
        </Container>
        <QuizList _ref={ref} _quiz={quiz} _mine={true}></QuizList>
    </>
}