import {useLocation} from "react-router";
import My_Navbar from "../component/navbar/my_Navbar";
import {Container, Row} from "react-bootstrap";
import CommunityQuizBlock from "../component/community/communityQuizBlock";
import CommunityCommentBlock from "../component/community/communityCommentBlock";

export default function CommunityPage(){
    const location = useLocation();



    return (<>
        <My_Navbar></My_Navbar>
        <Container className={"cus-font"}>
            <br className={"quiz_list_container"}/>
            <CommunityQuizBlock id={location.state.id}/>
            <CommunityCommentBlock id={location.state.id}/>
        </Container>


    </>)

}