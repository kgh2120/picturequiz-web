import {faMinusSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Tag({name}){
    <div className="tag">{name}<FontAwesomeIcon icon={faMinusSquare}></FontAwesomeIcon></div>
}