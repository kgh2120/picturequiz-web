import SearchTag from "./search_tag";

export default function SearchTagList({_tags}) {
    return <>
        {
            _tags.map(tag =>
                <>
                    <SearchTag name={tag.name}></SearchTag>
                </>
            )
        }
    </>
};