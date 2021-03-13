import { deployERC721PresetMinterPauserAutoId } from "../helpers/migration";

deployERC721PresetMinterPauserAutoId()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
