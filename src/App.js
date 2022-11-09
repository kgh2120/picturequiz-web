

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Main from "./view/main";
import Userform from "./view/userform";
import MyPage from "./view/mypage";
import QuizPlay from "./view/component/quiz/quiz-play/quiz-play";
import QuizAdd from "./view/component/quiz/quiz-add/quiz-add";
import Main_quiz_list from "./view/component/quiz/quiz-list/main_quiz_list";
import {Navbar} from "react-bootstrap";
import My_Navbar from "./view/component/navbar/my_Navbar";

function App() {
  return (
    <div >
    <My_Navbar></My_Navbar>
      <Router>
        <Routes>
          <Route path={"/"} element={<Main_quiz_list/>}/>
          <Route path={"/add"} element={<QuizAdd/>}/>
            <Route path={"/login"} element={<Userform _mode={"login"}/>}></Route>
            <Route path={"/signUp"} element={<Userform _mode={"signUp"}/>}></Route>
            <Route path={"/my-page"} element={<MyPage mode={"read"}/>}></Route>
          <Route path={"/my-page/update"} element={<MyPage mode={"update"}/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
