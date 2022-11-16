import Dropdown from "react-bootstrap/Dropdown";
import {Form} from "react-bootstrap";
import CharacterSearchResult from "./character_search_result";

export default function CharacterSearchForm ({_logSelectedMenu,_searchCharacterEvent,_character_name,_search_result}){
    return <>
        <Dropdown onSelect={_logSelectedMenu}>
            <Dropdown.Toggle as={Form.Control} onChange={_searchCharacterEvent} value={_character_name}
                             type="text" placeholder="캐릭터 이름을 입력하세요"
            />
            <CharacterSearchResult r={_search_result}></CharacterSearchResult>
        </Dropdown>
    </>
}

