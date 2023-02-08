import {Button, Form} from "react-bootstrap";
import {tokenAxios} from "../../utils/global/axios-config";
import {getAccessToken} from "../../utils/global/token";
import {handleError} from "../../utils/global/exception/global-exception-handler";

export default function CommentForm({_setFormId, reload,quizId, parentId}){


    const submitComment = (event) =>{

        if (getAccessToken() === null) {
            alert("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
        }

        const form = event.currentTarget;
        event.preventDefault();

        tokenAxios.post("/comments",{
            quizId,
            contents: form.desc.value,
            parentId
        }).then(() => {
            reload();
            form.reset();
            if(_setFormId !== undefined)
                _setFormId(null)
        })
            .catch(err => handleError(err))
    }

    return <>
        <Form onSubmit={submitComment}>
            <textarea className={"form-control"} name="desc" placeholder={"댓글을 입력하세요."}/>
            <div className={"flex-box flex-end mt-2"}><Button type={"submit"}>전송</Button></div>
        </Form>
    </>

}