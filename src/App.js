
import "./style.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Main from "./view/main";
import Userform from "./view/userform";

function App() {
    window.addEventListener("unload",() =>{
        localStorage.removeItem("access-token")
    })
  return (
    <div >
      <Router>
        <Routes>
          <Route path={"/"} element={<Main/>}/>
            <Route path={"/login"} element={<Userform _mode={"login"}/>}></Route>
            <Route path={"/signUp"} element={<Userform _mode={"signUp"}/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
