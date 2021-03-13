import { deployTemplate } from "../helpers/migration";

deployTemplate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
