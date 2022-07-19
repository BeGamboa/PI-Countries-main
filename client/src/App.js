import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/index.jsx";
import Home from "./components/Home/index";
import Details from "./components/Details";
import CreateActivity from "./components/CreateActivity";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route path={"/countries/:id"} component={Details} />
          <Route path={"/countries"} component={Home} />
          <Route path={"/activity"} component={CreateActivity} />
        </Switch>
    </div>
  );
}

export default App;
