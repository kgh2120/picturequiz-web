import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuizBlock from "./quiz_block";

// api 연동할 때 들어오는 값 타입 확인해 봐야 할 듯.
export default function QuizList({_quiz , _setQuiz, _ref}) {
    return <>
        <Container className={"quiz_list_container"}>
            <Row xs={1} sm={2} md={3} lg={4}>
                {
                    _quiz === undefined ? null :
                    _quiz.map(q => {
                        return q.map(qu=> {
                            return <QuizBlock characterName={qu.characterName} tags={qu.tags} img_url={qu.pictureUrl}
                                              quiz_id={qu.quizId}
                            ></QuizBlock>
                        })
                    })
                }
            </Row>
            <p ref={_ref}></p>
        </Container>

    </>
}