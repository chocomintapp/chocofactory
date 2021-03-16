import React from "react";

import { MypageTemplate } from "../components/templates/Mypage";
import { useAuth } from "../modules/auth";
import { firestore, contractCollectionName } from "../modules/firebase";

export const Mypage: React.FC = () => {
  const { signerAddressState } = useAuth();

  React.useEffect(() => {
    if (signerAddressState) {
      firestore.collection(contractCollectionName).get().then(console.log);
    }
  }, [signerAddressState]);

  return <MypageTemplate />;
};

export default Mypage;
