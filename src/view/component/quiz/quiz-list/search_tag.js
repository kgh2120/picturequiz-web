import {Button} from "react-bootstrap";

export default function SearchTag({name}) {
    return <>
        <Button variant={"light"} size={"sm"} className="m-1">
            {name}
        </Button></>
};