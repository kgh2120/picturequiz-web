import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuizBlock from "./quiz_block";
import {useEffect} from "react";

// api 연동할 때 들어오는 값 타입 확인해 봐야 할 듯.
export default function QuizList({_quiz}) {
    console.log(_quiz)


    return <>
        <Container className={"quiz_list_container"}>
            <Row xs={1} sm={2} md={3} lg={4}>
                {
                    _quiz.quizzes === undefined ? null :
                    _quiz.quizzes.map(q => {
                       return <QuizBlock characterName={q.characterName} tags={q.tagNames} img_url={q.pictureUrl}
                                   quiz_id={q.quizId}
                        ></QuizBlock>
                    })
                }
            </Row>
        </Container>

    </>
}