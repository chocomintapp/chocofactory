import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { RecoilRoot } from "recoil";

import { LoadingOverlay } from "./components/molecules/LoadingOverlay";
import { MessageModal } from "./components/molecules/MessageModal";
import { NotificationToast } from "./components/molecules/NotificationToast";

import { useLoadingOverlay, useMessageModal, useNotificationToast } from "./components/utils/atoms";

import Contract from "./pages/_chainId/_contractAddress";
import NFT from "./pages/_chainId/_contractAddress/_tokenId";
import CreateNFTContract from "./pages/create-nft-contract";
import Home from "./pages/index";
import Mypage from "./pages/mypage";

const App: React.FC = () => {
  const { isLoadingOverlayDiplay } = useLoadingOverlay();
  const { isMessageModalDisplay, messageModalProps } = useMessageModal();
  const { isNotificationToastDisplay, notificationToastProps } = useNotificationToast();
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/mypage" exact>
              <Mypage />
            </Route>
            <Route path="/create-nft-contract" exact>
              <CreateNFTContract />
            </Route>
            <Route path="/:chainId/:nftContractAddress" exact>
              <Contract />
            </Route>
            <Route path="/:chainId/:nftContractAddress/:tokenId" exact>
              <NFT />
            </Route>
          </Switch>
          {isLoadingOverlayDiplay && <LoadingOverlay />}
          {isMessageModalDisplay && messageModalProps && <MessageModal {...messageModalProps} />}
          {isNotificationToastDisplay && notificationToastProps && <NotificationToast {...notificationToastProps} />}
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
