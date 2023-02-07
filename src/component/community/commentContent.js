import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRectangleXmark, faThumbsDown, faThumbsUp, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";

export default function CommentContent({reportAction, isParent, comment, onClick}){

    const [recommended, setRecommended] = useState();
    const [notRecommended, setNotRecommended] = useState();
    const [nOfRecommended, setNOfRecommended] = useState();
    const [nOfNotRecommended, setNOfNotRecommended] = useState();


    useEffect(() => {
        setRecommended(comment.recommend);
        setNotRecommended(comment.notRecommend);
        setNOfRecommended(comment.numOfRecommend);
        setNOfNotRecommended(comment.numOfNotRecommend);

    },[comment])


    const recommend = () =>{
        if(notRecommended)
            setNOfNotRecommended(prev => prev-1)
        if(recommended)
            setNOfRecommended(prev => prev-1)
        else
            setNOfRecommended(prev => prev+1)

        setRecommended(prev => !prev)
        setNotRecommended(false);


        tokenAxios.post(`/comments/${comment.commentId}/recommend`)
            .catch(err => handleError(err));

    }


    const notRecommend = () =>{

        if(recommended)
            setNOfRecommended(prev => prev-1)
        if(notRecommended)
            setNOfNotRecommended(prev => prev-1)
        else
            setNOfNotRecommended(prev => prev+1)


        setNotRecommended(prev => !prev)
        setRecommended(false);
        tokenAxios.post(`/comments/${comment.commentId}/not-recommend`)
            .catch(err => handleError(err));
    }

    const deleteComment = () => {


        if(!window.confirm("정말 댓글을 삭제하시겠습니까?"))
            return;
        tokenAxios.delete(`/comments/${comment.commentId}`)
            .catch((err) => handleError(err));
    }
    return (
        <>
            <Row key={comment.commentId} className={"mt-2 align-items-center"}>
                <div className={"flex-box justify-content-between"}>
                    <span>{comment.authorNickname}</span>
                    <span>
                        <span className={"m-2"}>{comment.createdDateTime}</span>
                        <FontAwesomeIcon onClick={deleteComment} className={"comment_delete pointer"} icon={faRectangleXmark}/>
                        <FontAwesomeIcon onClick={reportAction} className={"pointer"} icon={faTriangleExclamation}/>
                    </span>
                </div>
                <Col>
                    {isParent ? <div className={"pointer"} onClick={onClick}>{comment.content}</div> :
                        <div onClick={onClick}>{comment.content}</div>}
                    <div className={"recommend_area"}>
                        {recommended === true ?     <FontAwesomeIcon onClick={recommend} className={"me-1 pointer black"} icon={faThumbsUp}/>
                        :     <FontAwesomeIcon onClick={recommend} className={"me-1 pointer white"} icon={faThumbsUp}/>}

                        <span className={"me-2"}>{nOfRecommended}</span>
                        {notRecommended === true ?  <FontAwesomeIcon onClick={notRecommend} className={"me-1 pointer black"} icon={faThumbsDown}/>
                        :  <FontAwesomeIcon onClick={notRecommend} className={"me-1 pointer white"} icon={faThumbsDown}/>}
                        <span>{nOfNotRecommended}</span>
                    </div>
                </Col>
            </Row>
        </>
    )
}