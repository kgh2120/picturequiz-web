import {baseAxios} from "./global/axios-config";
import {getRandomColor} from "./global/tag-color";
import {validateDuplicateArray, validateTagName} from "./global/validate";
import {INVALID_TAG_MESSAGE, INVALID_TAGSIZE_MESSAGE, TAG_DUPLICATE_MESSAGE} from "../component/error/error-message";

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


export const searchTag = (event, setTags, setTagName, tags, setTagErrorShow, setTagErrorMessage) => {
    if (window.event.keyCode === 13) {
        if (tags.length === 5) {
            setTagErrorShow(true);
            setTagErrorMessage(INVALID_TAGSIZE_MESSAGE)
            setTimeout(() => setTagErrorShow(false), 1000);
            return;
        }

        const value = event.target.value;
        if (!validateTagName(value)) {
            setTagErrorShow(true);
            setTagErrorMessage(INVALID_TAG_MESSAGE)
            setTimeout(() => setTagErrorShow(false), 1000);
            return;
        }


        if (validateDuplicateArray(tags, value)) {
            setTagErrorShow(true);
            setTagErrorMessage(TAG_DUPLICATE_MESSAGE)
            setTimeout(() => setTagErrorShow(false), 1000);
            setTagName("");
            return;
        }

        baseAxios.get(`/tag?name=${value}`).then(response => {
            setTags([...tags, {
                name: response.data.name,
                color: response.data.color
            }]);
            setTagName("");
        }).catch(err => {
            if (err.response.status === 404) {
                baseAxios.post(`/tag`, {
                    name: value,
                    color: getRandomColor()
                }).then(response => {
                    setTags([...tags, {
                        name: response.data.name,
                        color: response.data.color
                    }]);
                    console.log(response.data);
                    setTagName("");
                })

            }
        });
    }
}