import Dropdown from "react-bootstrap/Dropdown";

export default function CharacterSearchResult({r}) {


    return <>
        {r.length != 0 ? <Dropdown.Menu className={"w-100 "}>
            {
                r.map(j => <Dropdown.Item eventKey={JSON.stringify(j)} key={j.characterId}
                                          className={"flex-box space-between"}>
                    <span>{j.name}</span>
                    <span>{j.job}</span>
                </Dropdown.Item>)
            }
        </Dropdown.Menu> : null}
    </>

};