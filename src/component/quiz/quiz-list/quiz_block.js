
import {Card, Button} from "react-bootstrap";
import Tag from "../tag/tag";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faPlay, faTrashCan, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
export default function QuizBlock({characterName, tags, quiz_id, img_url, mine, createModal}) {

    const navigate = useNavigate();

    const play_quiz = () => {

        navigate('/quiz/play',{
            state : {
                id : quiz_id
            }
        })
    }

    const lastButton = () => {

        if(mine)
            return <Button variant={"danger"} href="#" className="block_btn_area w-30"><FontAwesomeIcon icon={faTrashCan}/></Button>;
        return <Button onClick={createModal} variant={"danger"} href="#" className="block_btn_area w-30"><FontAwesomeIcon icon={faTriangleExclamation}/></Button>


    }

    return <>


        <Card className={"card_area"}>
            <div className={"card_block"}>
                <Card.Img className={"card_img"} variant={"top"}
                          src={img_url}
                          alt="..."/>
            </div>

            {/*alt -> 추후에 스피너 or X 같은거로 이미지 못 불러왔다고 변경*/}
            <Card.Body>
                <Card.Title>{characterName}</Card.Title>
                <div className="tag_area">
                    {
                        tags === undefined ? null :
                        tags.map(t =>{
                        return <Tag key={t.name} _tag={t}></Tag>
                    })}
                </div>
                <div className="block_btn_area row-cus">
                    <Button onClick={play_quiz} variant={"success"} href="#" className="block_btn_area w-30 "><FontAwesomeIcon icon={faPlay}/></Button>
                    <Button variant={"warning"} href="#" className="block_btn_area w-30"><FontAwesomeIcon icon={faComment}/></Button>
                    {lastButton()}
                </div>
            </Card.Body>
        </Card>



    </>
};