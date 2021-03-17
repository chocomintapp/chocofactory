import canonicalize from "canonicalize";
import createClient from "ipfs-http-client";
import { Metadata } from "../types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ipfsOnlyHash = require("ipfs-only-hash");

export const ipfsBaseUrl = "ipfs://";
export const ipfsHttpsBaseUrl = "https://ipfs.io/ipfs/";

export const ipfs = createClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const metadataToIpfsCid = async (metadata: Metadata) => {
  const canonicalizeMetadata = canonicalize(metadata) as string;
  const canonicalizeMetadataBuffer = Buffer.from(canonicalizeMetadata);
  const cid = await ipfsOnlyHash.of(canonicalizeMetadataBuffer);
  return cid;
};
