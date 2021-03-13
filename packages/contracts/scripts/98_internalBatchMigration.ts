import { deployFactory, deployTemplate } from "../helpers/migration";

export const main = async () => {
  const factory = await deployFactory();
  const template = await deployTemplate();
  return { factory, template };
};
