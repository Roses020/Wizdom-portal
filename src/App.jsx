// import logo from './logo.svg';
import { Routes, Route, Navigate} from "react-router-dom";

import "./App.css";
import { useContext } from "react";

import Home from "./components/Home";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Header from "./components/Header";
import AuthContext from "./store/AuthContext";



const App = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token)
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={authCtx.token ? <Home /> : <Auth />} />
        <Route path="/Home" element={authCtx.token ? <Home /> : <Navigate to="/" />} />
        <Route path="/Profile" element={authCtx.token ? <Profile /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;