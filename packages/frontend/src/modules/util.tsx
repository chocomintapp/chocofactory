export const shortenAddress = (rawAddress: string) => {
  const pre = rawAddress.substring(0, 5);
  const post = rawAddress.substring(38);
  return `${pre}...${post}`;
};
