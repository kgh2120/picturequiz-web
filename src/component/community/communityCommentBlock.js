import {useEffect, useState} from "react";
import {baseAxios, tokenAxios} from "../../utils/global/axios-config";
import {handleError} from "../../utils/global/exception/global-exception-handler";
import CommentBlock from "./commentBlock";
import {getAccessToken} from "../../utils/global/token";
import PageNum from "./pageNum";
import CommentForm from "./commentForm";
import {MEMBER_ORDER, TARGET_TYPE} from "../../utils/constants";
import ReportModal from "../report/reportModal";

export default function CommunityCommentBlock({id}) {

    const [formId,setFormId] = useState("");


    const [contents, setContents] = useState(
        {
            comments: [],
            currentPage: 0,
            nextPage:0,
            lastPage: 0
        }
    );

    function retrieveComments(pageNum) {
        if (getAccessToken() === null) {
            baseAxios.get(`/comments?quizId=${id}&pageNum=${pageNum}`)
                .then(res => {
                    setContents({
                        comments: res.data.comments,
                        currentPage: res.data.currentPage,
                        nextPage: res.data.nextPage,
                        lastPage: res.data.lastPage
                    })
                }).catch(err => handleError(err));
        } else {
            tokenAxios.get(`/comments?quizId=${id}&pageNum=${pageNum}`)
                .then(res => {
                    setContents({
                        comments: res.data.comments,
                        currentPage: res.data.currentPage,
                        nextPage: res.data.nextPage,
                        lastPage: res.data.lastPage
                    })
                }).catch(err => handleError(err));
        }
    }

    useEffect(() => {
        retrieveComments(0);
    }, [id])

    const retrievePrevPage = () => {
        if(contents.currentPage - 1 < 0)
            return;
        retrieveComments(contents.currentPage - 1);
    }

    const reloadCurrentPage = () => {
        retrieveComments(contents.currentPage);
    }

    const retrieveNextPage = () => {
        if (contents.lastPage < contents.nextPage)
            return;
        retrieveComments(contents.nextPage);
    }

    const [show,setShow] = useState(false);
    const [targetId, setTargetId] = useState("");
    const createModal = (targetId) =>{
        setTargetId(targetId);
        setShow(true);
    }

    return (
        <>
            <div>
                {contents.comments.map(c => {
                    return <CommentBlock reportAction={() => createModal(c.commentId)} reload={reloadCurrentPage} quizId={id} _formId={formId} _setFormId={setFormId} comment={c}/>
                })}
                <PageNum currentPage={contents.currentPage + 1} lastPage={contents.lastPage + 1}
                         retrievePrevPage={retrievePrevPage} retrieveNextPage={retrieveNextPage}/>
                <div>
                    <CommentForm reload={reloadCurrentPage} quizId={id}/>
                </div>
            </div>
            <ReportModal _show={show} _setShow={setShow} _targetType={TARGET_TYPE.COMMENT} _targetId={targetId} />
        </>
    )

}