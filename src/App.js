import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Userform from "./pages/userform";
import MyPage from "./pages/mypage";
import QuizPlay from "./component/quiz/quiz-play/quiz-play";
import QuizAdd from "./component/quiz/quiz-add/quiz-add";
import Main_quiz_list from "./component/quiz/quiz-list/main_quiz_list";
import MyQuizList from "./component/quiz/quiz-list/my_quiz_list";
import PrivateRoute from "./component/route/private-route";
import CommunityPage from "./pages/communityPage";
import AdminPage from "./pages/adminPage";

function App() {
  return (
    <div >
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={"/"} element={<Main_quiz_list/>}/>
            <Route path={"/login"} element={<Userform _mode={"login"}/>}></Route>
            <Route path={"/signUp"} element={<Userform _mode={"signUp"}/>}></Route>
            <Route path={"/my-page"} element={
              <PrivateRoute>
              <MyPage mode={"read"}/>
              </PrivateRoute>
            }/>
          <Route path={"/my-page/update"} element={
            <PrivateRoute>
            <MyPage mode={"update"}/>
            </PrivateRoute>
          }/>
          <Route path={"/quiz/add"} element={
            <PrivateRoute>
              <QuizAdd/>
            </PrivateRoute>
          }/>
          <Route path={"/quiz/my"} element={<PrivateRoute><MyQuizList/></PrivateRoute>}/>
          <Route path={"/quiz/play"} element={<QuizPlay/>}></Route>
          <Route path={"/community"} element={<CommunityPage/>}></Route>
          <Route path={"/admin"} element={<AdminPage/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
