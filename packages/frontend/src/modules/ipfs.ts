import canonicalize from "canonicalize";
import createClient from "ipfs-http-client";
import { Metadata } from "../types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ipfsOnlyHash = require("ipfs-only-hash");

export const ipfsBaseUrl = "ipfs://";
export const ipfsHttpsBaseUrl = "https://ipfs.io/ipfs/";

// restricted with HTTP ORIGINS "https://factory.chocomint.app/"
const projectId = "2GfKaXLC7P9wNUw8u7lSKCJLh5X";
const projectSecret = "89518e3ea6fde1f8e5f232ed85bcfbc1";
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
