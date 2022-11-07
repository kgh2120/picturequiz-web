
import {Card, Button} from "react-bootstrap";
import Tag from "../tag/tag";
export default function QuizBlock({
    characterName, tags, quiz_id, img_url
                                  })

// quiz_id는 게임 시작 버튼 클릭할 때 작동하도록 설정

{
    return <>


        <Card>
            <Card.Img variant={"top"}
                src={img_url}
                alt="..."/>
            {/*alt -> 추후에 스피너 or X 같은거로 이미지 못 불러왔다고 변경*/}
            <Card.Body>
                <Card.Title>{characterName}</Card.Title>
                <div className="tag_area">
                    {tags.map(t =>{
                        <Tag key={t.name} name={t.name}></Tag>
                    })}
                    <Tag name={"개그맨"}></Tag>
                </div>
                <div className="row-cus"><Button variant={"success"} href="#" className="w-45 ">시작하기</Button>
                    <Button variant={"warning"} href="#" className="w-45">커뮤니티</Button>
                </div>
            </Card.Body>
        </Card>



    </>
};