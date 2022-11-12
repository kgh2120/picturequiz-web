import axios from "axios";
import {baseAxios} from "./global/axios-config";
import {getRandomColor} from "./global/tag-color";

export const searchCharacter = (event, setCharacter_name, setSearchResult) => {
    let data = event.target.value;
    setCharacter_name(data);
    baseAxios.get(`/character?name=${data}`)
        .then(response => {
            if (response.data.length != 0)
                setSearchResult(response.data);
            if (data === "" || data === " ")
                setSearchResult([]);
        })
}


export const searchTag = async (event, setTags, setTagName, tags) => {
    if (window.event.keyCode === 13) {
        try {
            let response = await baseAxios.get(`/tag?name=${event.target.value}`);
            setTags([...tags, {
                name: response.data.name,
                color: response.data.color
            }]);
            console.log(response.data);
            setTagName("");
        } catch (err){
            if (err.response.status === 404) {
                let response = await baseAxios.post(`/tag`, {
                    name: event.target.value,
                    color: getRandomColor()
                })
                setTags([...tags, {
                    name: response.data.name,
                    color: response.data.color
                }]);
                console.log(response.data);
                setTagName("");
            }
        }
    }
}