import QuizList from "./quiz_list";
import SearchBlock from "./searchBlock";
import My_Navbar from "../../navbar/my_Navbar";



export default function Main_quiz_list(){
    return <>
        <My_Navbar></My_Navbar>
        <SearchBlock></SearchBlock>
        <QuizList></QuizList>

    </>
}