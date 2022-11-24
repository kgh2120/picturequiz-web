import QuizList from "./quiz_list";
import QuizSearchBlock from "./quizSearchBlock";
import My_Navbar from "../../navbar/my_Navbar";
import {useEffect, useState} from "react";
import {autoLogin, getAccessToken, getRefreshToken} from "../../../utils/global/token";
import {baseAxios} from "../../../utils/global/axios-config";
import {useInView} from "react-intersection-observer";


export default function Main_quiz_list() {

    const [nextPageNum, setnextPageNum] = useState(0)
    const [hasNext, setHasNext] = useState();
    const [ref, inView] = useInView()
    const [loading, setLoading] = useState(false);
    const [searchCondition, setSearchCondition] = useState({
        pageNum: 0,
        answerName: "",
        orderCondition: "POPULAR",
        tagNames: []
    });
    const [quiz, setQuiz] = useState([])


    const searchQuiz = () => {
        setLoading(true)
        baseAxios.post("/quiz", searchCondition)
            .then(response => {
                if(response.data.hasNext)
                    response.data.quizzes.pop();
                setQuiz(prev => [response.data.quizzes]);
                setnextPageNum(response.data.nextPageNum);
                setHasNext(response.data.hasNext);
            }).catch(err => {
            alert("검색 결과가 없습니다.");
        })
        setLoading(false)
    }

    useEffect(() => {
        if (!getAccessToken() && getRefreshToken()) {
            autoLogin();
        }
    }, [])
    useEffect(() => {
        searchQuiz()
    }, [searchCondition])

    const searchMore = () => {
        setLoading(true)
        const moreCondition = {
            pageNum: nextPageNum,
            answerName: searchCondition.answerName,
            orderCondition: searchCondition.orderCondition,
            tagNames: searchCondition.tagNames
        }
        baseAxios.post("/quiz", moreCondition)
            .then(response => {
                if(response.data.hasNext)
                    response.data.quizzes.pop();
                setQuiz(prev => [...prev, response.data.quizzes]);
                setnextPageNum(response.data.nextPageNum);
                setHasNext(response.data.hasNext);
            }).catch(err => {
            alert("검색 결과가 없습니다.");
        })
        setLoading(false)
    }

    useEffect(() => {
        if (inView && !loading && hasNext) {
            searchMore()
        }
    }, [inView])

    return <>
        <My_Navbar></My_Navbar>
        <QuizSearchBlock _setSearchCondition={setSearchCondition}></QuizSearchBlock>
        <QuizList _ref={ref} _quiz={quiz}></QuizList>

    </>
}