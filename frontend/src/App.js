import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Listing from "./components/screens/Listing";
import Login from "./components/screens/Login";
import UserRoute from "./route/User";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" component={Login} exact />
      <UserRoute path="/listing" component={Listing} />
    </Router>
  );
}

export default App;
