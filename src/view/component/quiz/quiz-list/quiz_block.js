
import {Card, Button} from "react-bootstrap";
import Tag from "../tag/tag";
export default function QuizBlock({characterName, tags, quiz_id, img_url}) {


    return <>


        <Card className={" card_area"}>
            <div className={" card_block"}>
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
                        return <Tag key={t} name={t}></Tag>
                    })}

                </div>
                <div className="block_btn_area row-cus"><Button variant={"success"} href="#" className="block_btn_area w-45 ">시작하기</Button>
                    <Button variant={"warning"} href="#" className="block_btn_area w-45">커뮤니티</Button>
                </div>
            </Card.Body>
        </Card>



    </>
};