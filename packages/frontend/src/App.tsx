import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { RecoilRoot } from "recoil";

import Home from "./pages/index";

const App: React.FC = () => {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
