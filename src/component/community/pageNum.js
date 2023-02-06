import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default function PageNum({retrievePrevPage, retrieveNextPage, currentPage, lastPage}){
    return <>
        <div className={"flex-box justify-content-center align-items-center mt-3 p-3 fa-2x"}>
            <FontAwesomeIcon className={"pointer"} onClick={retrievePrevPage} icon={faChevronLeft}/>
            <span className={"currentPageNum"}>{currentPage}</span>
            <span className={"slash"}>/</span>
            <span className={"lastPageNum"}>{lastPage}</span>
            <FontAwesomeIcon className={"pointer"} onClick={retrieveNextPage} icon={faChevronRight}/>
        </div>
    </>
}