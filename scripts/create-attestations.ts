import { AttestationStation } from "../typechain-types/AttestationStation";
import { CliqueClient, Environment } from "@cliqueofficial/clique-sdk";
import { ethers } from "hardhat";
import { UserData } from "./types";

const apiKey = String(process.env.CLIQUE_API_KEY) || "";
const apiSecret = String(process.env.CLIQUE_API_SECRET) || "";

export async function createAttestations(users: UserData[]) {
  // Instantiate an array of AttestationDataStructs
  let Attestations: AttestationStation.AttestationDataStruct[] = [];
  // Instantiate array of Keys
  let keys: string[] = [];

  // Instantiate CliqueClient
  const client = new CliqueClient({
    env: Environment.Test,
    apiKey,
    apiSecret,
  });

  // Fetch campaign data
  const campaignData = await client.campaign.getConfig();
  const campaignKeys = campaignData.entryFieldsConfig;

  // Parse data in to an array of keys
  for (const key of campaignKeys) {
    keys.push(key.name);
  }
  const formattedKeys = formatKeyLength(keys);

  // Loop through the provided users and fetch their statistics
  for (const user of users) {
    const userData = await client.campaign.getStatistics({
      walletAddress: user.walletAddress,
      twitterAccessToken: user.twitterAccessToken,
    });

    // Construct the attestations
    for (let i = 0; i < keys.length; i++) {
      const attestationKey = `clique-${formattedKeys[i]}`;
      Attestations.push({
        about: user.walletAddress,
        key: ethers.utils.formatBytes32String(attestationKey),
        val: ethers.utils.toUtf8Bytes(
          userData["statistics"][keys[i]].toString()
        ),
      });
    }
  }
  return Attestations;
}

function formatKeyLength(keys: string[]): string[] {
  let formattedKeys = keys.slice();
  for (let i = 0; i < formattedKeys.length; i++) {
    if (formattedKeys[i] == "sumProjectPostImpressionsTwitter") {
      formattedKeys[i] = "sumProjPostImprTwitter";
    }
    if (formattedKeys[i] == "avgPostImpressionsTwitter") {
      formattedKeys[i] = "avgPostImprTwitter";
    }
  }
  return formattedKeys;
}
