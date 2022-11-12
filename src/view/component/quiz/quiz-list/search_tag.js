import {Button} from "react-bootstrap";
import {faMinusSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SearchTag({name, _deleteTags, _tags}) {

    const setDeletename = (event) =>{
        let slice = _tags.filter(tag => tag.name !== event.currentTarget.value);
        _deleteTags(slice)
    }

    return <>
        <Button onClick={setDeletename} variant={"light"} size={"sm"} className=" col-auto m-1 " value={name}>
            <span>{name}</span><FontAwesomeIcon className={"tag_icon"} icon={faMinusSquare}></FontAwesomeIcon>
        </Button></>
};