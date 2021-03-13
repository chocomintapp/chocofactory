import {
  deployFactory,
  deployERC721PresetMinterPauserAutoId,
} from "../helpers/migration";

// this is for using same script in both testing and deployment
export const main = async () => {
  const factory = await deployFactory();
  const template = await deployERC721PresetMinterPauserAutoId();
  return { factory, template };
};
