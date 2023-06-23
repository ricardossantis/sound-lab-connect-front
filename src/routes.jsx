import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Marketplace from "./Pages/Marketplace"
import { useContext } from "react";
import { UserContext } from './App';

const RoutesComp = () => {
  const { isLoggedIn } = useContext(UserContext);

  return(
      <BrowserRouter>
        {!isLoggedIn ?
          <Routes>
            <Route element={<Navigate to="/login" replace={true} />} path="/" />
            <Route element={<Login/>} path="/login" />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes> :
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/services" element={<Marketplace />}/>
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        }
      </BrowserRouter>
  )
}

export default RoutesComp;