import {Button} from "react-bootstrap";
import {faMinusSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef} from "react";

export default function SearchTag({_tag, _deleteTags, _tags}) {

    const target = useRef();

    const setDeleteName = (event) =>{
        let slice = _tags.filter(tag => tag.name !== event.currentTarget.value);
        _deleteTags(slice)
    }

    const changeColor = () =>{
        console.log(target);
        target.current.style.backgroundColor = _tag.color
    }

    useEffect(() =>{
        changeColor();
    },[])


    return <>
        <Button ref={target}  onClick={setDeleteName} variant={"light"} size={"sm"} className="col-auto m-1" value={_tag.name}>
            <span>{_tag.name}</span><FontAwesomeIcon className={"tag_icon"} icon={faMinusSquare}></FontAwesomeIcon>
        </Button></>
};