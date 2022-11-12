import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Userform from "./view/userform";
import MyPage from "./view/mypage";
import QuizPlay from "./view/component/quiz/quiz-play/quiz-play";
import QuizAdd from "./view/component/quiz/quiz-add/quiz-add";
import Main_quiz_list from "./view/component/quiz/quiz-list/main_quiz_list";
import MyQuizList from "./view/component/quiz/quiz-list/my_quiz_list";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path={"/"} element={<Main_quiz_list/>}/>
            <Route path={"/login"} element={<Userform _mode={"login"}/>}></Route>
            <Route path={"/signUp"} element={<Userform _mode={"signUp"}/>}></Route>
            <Route path={"/my-page"} element={<MyPage mode={"read"}/>}></Route>
          <Route path={"/my-page/update"} element={<MyPage mode={"update"}/>}></Route>
          <Route path={"/quiz/add"} element={<QuizAdd/>}/>
          <Route path={"/quiz/my"} element={<MyQuizList/>}/>
          <Route path={"/quiz/play"} element={<QuizPlay/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
