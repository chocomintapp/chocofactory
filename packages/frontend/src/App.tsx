import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { RecoilRoot } from "recoil";

import Contract from "./pages/contracts/_contractAddress";
import CreateNFT from "./pages/contracts/_contractAddress/create-nft";
import CreateNFTContract from "./pages/create-nft-contract";
import Home from "./pages/index";
import Mypage from "./pages/mypage";

const App: React.FC = () => {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/create-nft-contract" exact>
              <CreateNFTContract />
            </Route>
            <Route path="/contracts/:contractAddress" exact>
              <Contract />
            </Route>
            <Route path="/contracts/:contractAddress/create" exact>
              <CreateNFT />
            </Route>
            <Route path="/mypage" exact>
              <Mypage />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
