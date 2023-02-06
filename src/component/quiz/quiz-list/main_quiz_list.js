import QuizList from "./quiz_list";
import QuizSearchBlock from "./quizSearchBlock";
import My_Navbar from "../../navbar/my_Navbar";
import {useEffect, useState} from "react";
import {autoLogin, getAccessToken, getRefreshToken} from "../../../utils/global/token";
import {baseAxios} from "../../../utils/global/axios-config";
import {useInView} from "react-intersection-observer";
import {handleError} from "../../../utils/global/exception/global-exception-handler";


export default function Main_quiz_list() {

    const [nextPageNum, setNextPageNum] = useState(0)
    const [hasNext, setHasNext] = useState();
    const [ref, inView] = useInView()
    const [loading, setLoading] = useState(false);
    const [searchConditionBackUp, setSearchConditionBackUp] = useState({
        pageNum: 0,
        answerName: "",
        orderCondition: "POPULAR",
        tagNames: []
    });
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
                setSearchConditionBackUp(searchCondition);
                if(response.data.hasNext)
                    response.data.quizzes.pop();
                setQuiz(prev => [response.data.quizzes]);
                setNextPageNum(response.data.nextPageNum);
                setHasNext(response.data.hasNext);
            }).catch(err => {
                handleError(err)
                if(err.response.status!==0)
                    setSearchCondition(searchConditionBackUp)
        })
        setLoading(false)
    }



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
                setNextPageNum(response.data.nextPageNum);
                setHasNext(response.data.hasNext);
            }).catch(err => {
                handleError(err)
        })
        setLoading(false)
    }

    useEffect(() => {
        if (inView && !loading && hasNext) {
            searchMore()
        }
    }, [inView])
    useEffect(() => {
        if (!getAccessToken() && getRefreshToken()) {
            autoLogin();
        }
    }, [])
    useEffect(() => {
        searchQuiz()
    }, [searchCondition])

    return <>
        <My_Navbar></My_Navbar>
        <QuizSearchBlock _setSearchCondition={setSearchCondition}></QuizSearchBlock>
        <QuizList _ref={ref} _quiz={quiz} _mine={false}></QuizList>

    </>
}