
import "./style.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Main from "./view/main";
import Login from "./view/Login";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path={"/"} element={<Main/>}/>
            <Route path={"/login"} element={<Login/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
