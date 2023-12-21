import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav.js";
import List_Employee from "./components/ListEmployee/ListEmployee.js";
import Footer from "./components/Footer/Footer.js";
import AddEmployee from "./components/AddEmployee/AddEmployee.js";
import NotFound from "./components/NotFound/NotFound.js";
import UpdateEmployee from "./components/UpdateEmployee/UpdateEmployee.js";
import ViewEmployee from "./components/ViewEmployee/ViewEmployee.js";
import Login from "./components/LogIn/LogIn.js";
import Home from "./components/Home/Home.js";
import React, { useState } from "react";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const handleLoginSuccess = () => {
    setIsAuth(true);
    console.log(isAuth);
  };
  const logout = () => {
    setIsAuth(false);
  };
  return (
    <div>
      <Router>
        {isAuth && <Nav isAuth={isAuth} logout={logout} />}
        <div className="container">
          <Routes>
            {isAuth === false && (
              <Route
                exact
                path="/"
                element={
                  <Login isAuth={isAuth} onLoginSuccess={handleLoginSuccess} />
                }
              />
            )}
            {isAuth && (
              <Route path="/employees" Component={List_Employee}></Route>
            )}
            {isAuth && (
              <Route path="/add_employee" Component={AddEmployee}></Route>
            )}
            {isAuth && (
              <Route
                path="/update_employee/:id"
                Component={UpdateEmployee}
              ></Route>
            )}
            {isAuth && (
              <Route path="/view_employee/:id" Component={ViewEmployee}></Route>
            )}
            {isAuth && <Route path="/home" Component={Home}></Route>}
            <Route
              path="*"
              element={<NotFound isAuth={isAuth} logout={logout} />}
            />
          </Routes>
        </div>
        {isAuth && <Footer />}
      </Router>
    </div>
  );
}
