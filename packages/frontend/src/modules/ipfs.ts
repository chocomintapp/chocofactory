import canonicalize from "canonicalize";
import createClient from "ipfs-http-client";
import { Metadata } from "../types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ipfsOnlyHash = require("ipfs-only-hash");

export const ipfsBaseUrl = "ipfs://";
export const ipfsHttpsBaseUrl = "https://ipfs.io/ipfs/";

// restricted with HTTP ORIGINS "https://factory.chocomint.app/"
const projectId = "2DEjaXyZRr8OhYH1uehWvhcFZcU";
const projectSecret = "9122faab2152b36c4e0640461ea0a827";
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const ipfs = createClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const metadataToIpfsCid = async (metadata: Metadata) => {
  const canonicalizeMetadata = canonicalize(metadata) as string;
  const canonicalizeMetadataBuffer = Buffer.from(canonicalizeMetadata);
  const cid = await ipfsOnlyHash.of(canonicalizeMetadataBuffer);
  return cid;
};
