import {Form} from "react-bootstrap";

export default function CharacterSearchForm ({_searchCharacterEvent,_character_name}){
    return <>
            <Form.Control onChange={_searchCharacterEvent} value={_character_name}
                             type="text" placeholder="캐릭터 이름을 입력하세요"
            />
    </>
}

