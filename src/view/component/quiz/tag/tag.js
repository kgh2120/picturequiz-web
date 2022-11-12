export default function Tag({_tag}){

    return <><div className="tag tag_font" style={{backgroundColor : _tag.color}}>{_tag.name}</div>
        </>
}