import { ethers } from "hardhat";
import { fetchClientData } from "./clique-data";
import { recordAttestations } from "./record-attestations";
import { UserData } from "./types";

const contractAddress = process.env.CONTRACT_ADDRESS || "";

async function main(addresses: UserData[], key: string) {
  // Set the Attestations issuer
  const [signer] = await ethers.getSigners();

  // Fetch the Attestations data using Clique's SDK
  const attestations = await fetchClientData(addresses, key);

  // Record the Attestations on-chain
  const tx = await recordAttestations(contractAddress, signer, attestations);
}
