import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";

import Account from "./Pages/Account/Account";
import Sign from "./Pages/Account/Sign";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path="/" />
          <Route Component={Sign} path="/cadastro" />
          <Route Component={Sign} path="/login" />
          <Route Component={Account} path="/conta" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
