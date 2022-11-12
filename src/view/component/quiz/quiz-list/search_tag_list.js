import SearchTag from "./search_tag";
import {useEffect, useState} from "react";

export default function SearchTagList({_tags,_setTags}) {

    return <>
        {
            _tags.map(tag =>
                <>
                    <SearchTag  _tags={_tags} _deleteTags={_setTags}  _tag={tag}></SearchTag>
                </>
            )
        }
    </>
};