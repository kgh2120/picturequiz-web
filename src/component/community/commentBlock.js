import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesRight, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import CommentContent from "./commentContent";
import CommentForm from "./commentForm";
import {useState} from "react";

export default function CommentBlock({reload, quizId, comment, _setFormId, _formId}){

    const isParent = comment.parentId === null;
    const showCommentForm = () => {
        if (_formId === comment.commentId) {
            _setFormId(null);
            return;
        }
        _setFormId(comment.commentId);
    }
    function createBlock(){
        if (isParent) {
            return    <div>
                <CommentContent isParent={true} onClick ={showCommentForm} comment={comment}/>
                {
                    _formId === comment.commentId ?
                        <CommentForm _setFormId={_setFormId} reload={reload} quizId={quizId} parentId={comment.commentId}/>
                        : null
                }
                <hr/>
            </div>;
        }
            return <>
                <div className={"flex-box align-items-center"}>
                    <div className={"child_angle_area"}><FontAwesomeIcon icon={faAnglesRight} className={"child_angle"}/></div>
                    <div className={"child_block mt-2"}><CommentContent isParnet={false} comment={comment}/></div>
                </div>
                <hr/>
            </>;
    }

    return (
        <>
            {createBlock()}
        </>
    )
}