import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";

export interface CreateNFTFormProps {
  nftContractAddress: string;
}

export const CreateNFTForm: React.FC<CreateNFTFormProps> = ({ nftContractAddress }) => {
  const [token_id, setTokenId] = React.useState("");
  const history = useHistory();

  const createNFT = async () => {
    history.push(`/contracts/${nftContractAddress}/${token_id}`);
  };
  return (
    <>
      <div className="mb-8">
        <Form>
          <FormInput type="number" label="TokenID" setState={setTokenId} />
        </Form>
      </div>
      <Button onClick={createNFT} type="primary">
        Create
      </Button>
    </>
  );
};
