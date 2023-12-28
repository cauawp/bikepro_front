import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";

import Account from "./Pages/Account/Account";
import Sign from "./Pages/Account/Sign";
import ProductRoutes from "./Pages/Product/ProductRoutes";
import CartRoutes from "./Pages/Cart/CartRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Sign} path="/cadastro" />
        <Route Component={Sign} path="/login" />
        <Route Component={Sign} path="/resetar-senha" />
        <Route Component={Account} path="/conta" />
        <Route Component={ProductRoutes} path="/products/*" />
        <Route Component={CartRoutes} path="/carrinho/*" />
      </Routes>
    </>
  );
}

export default App;
