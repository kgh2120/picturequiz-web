import {Button} from "react-bootstrap";

export default function Mypagebuttongroup({_mode}) {

    return                     <div className={"my-page_content "}>
        <div className={"my-page_content_button_area"}>
            { _mode !== "update" ?<>
                <Button href={"/my-profile/update"} variant={"warning"}
                        className={"my-page_content_button  my-page_content_button_edit"}>정보 변경</Button>
                <Button variant={"danger"}
                        className={"my-page_content_button my-page_content_button_delete"}>탈퇴하기</Button></> :<>
                <Button href={"/"} variant={"primary"}
                        className={"my-page_content_button  my-page_content_button_edit"}>홈 으로</Button>
                <Button variant={"light"} href={"/my-page"}
                        className={"my-page_content_button my-page_content_button_delete"}>취소하기</Button></>
            }
        </div>
    </div>
};