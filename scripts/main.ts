import { ethers } from "hardhat";
import { createAttestations } from "./create-attestations";
import { recordAttestations } from "./record-attestations";
import { UserData } from "./types";

const contractAddress = process.env.CONTRACT_ADDRESS || "";

async function main(users: UserData[]) {
  // Set the Attestations issuer
  const [signer] = await ethers.getSigners();

  // Fetch the Attestations data using Clique's SDK
  const attestations = await createAttestations(users);

  // Record the Attestations on-chain
  const tx = await recordAttestations(contractAddress, signer, attestations);
  console.log(tx);
}
// main([
//   {
//     walletAddress: "0xBaaa0916ED5F3015d7E004c50Aa5cF5cFAB11804",
//     twitterAccessToken:
//       "VzgwY0FLNmhsaGRnRjJQN2dGX2U3Xy0xWm05MF8xUlNoSUpEM2tfSEJsWXBPOjE2NzExODQ2MjcxNDQ6MTowOmF0OjE",
//   },
// ]);
