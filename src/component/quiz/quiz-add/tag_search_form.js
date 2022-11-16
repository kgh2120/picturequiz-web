import {Form} from "react-bootstrap";
import {ErrorMessage} from "../../error/error-message";
import {useRef} from "react";

export default function TagSearchForm({changeTagName, searchTagEvent, tagName,_tagErrorShow, _tagErrorMessage}) {
    const target = useRef(null)
    return <>
        <Form.Control ref={target} onChange={changeTagName} onKeyUp={searchTagEvent} value={tagName} type="text"
                      placeholder="태그를 추가하세요"/>
        <ErrorMessage show={_tagErrorShow} message={_tagErrorMessage} target={target}/>
    </>
};