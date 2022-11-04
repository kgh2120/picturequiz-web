import {faMinusSquare} from "@fortawesome/free-regular-svg-icons";

export default function Tag({name}){
    <div className="tag">{name}<faMinusSquare></faMinusSquare></div>
}