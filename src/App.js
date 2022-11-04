

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Main from "./view/main";
import Userform from "./view/userform";
import MyPage from "./view/mypage";
import QuizPlay from "./view/component/quiz/quiz-play/quiz-play";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path={"/"} element={<QuizPlay/>}/>
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
