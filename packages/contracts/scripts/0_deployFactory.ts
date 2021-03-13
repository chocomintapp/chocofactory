import { deployFactory } from "../helpers/migration";

deployFactory()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
