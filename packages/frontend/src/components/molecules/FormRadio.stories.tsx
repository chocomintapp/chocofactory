import React from "react";
import { FormRadio, FormRadioProps } from "./FormRadio";

const args: FormRadioProps = {
  label: "label",
  labels: ["Local", "Rinkeby", "Matic Testnet"],
  values: ["localhost", "rinkeby", "matic-testnet"],
  setState: () => {
    console.log("onchange");
  },
};

export default {
  title: "Molecules/FormRadio",
  component: FormRadio,
  args,
};

export const Control: React.FC<FormRadioProps> = (props) => <FormRadio {...props}>{props.children}</FormRadio>;
