import {Button} from "react-bootstrap";
import {faMinusSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SearchTag({name}) {
    return <>
        <Button variant={"light"} size={"sm"} className="m-1 tag_btn">
            <span>{name}</span><FontAwesomeIcon className={"tag_icon"} icon={faMinusSquare}></FontAwesomeIcon>
        </Button></>
};