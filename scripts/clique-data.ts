import { AttestationStation } from "./../typechain-types/AttestationStation";
import { CliqueClient, Environment } from "@cliqueofficial/clique-sdk";
import { ethers } from "hardhat";
import { UserData } from "./types";

const apiKey = String(process.env.CLIQUE_API_KEY) || "";
const apiSecret = String(process.env.CLIQUE_API_SECRET) || "";

export async function fetchClientData(
  users: UserData[],
  key: string
): Promise<AttestationStation.AttestationDataStruct[]> {
  // Instantiate an array of AttestationDataStructs
  let Attestations: AttestationStation.AttestationDataStruct[] = [];

  // Instantiate CliqueClient
  const client = new CliqueClient({
    env: Environment.Test,
    apiKey,
    apiSecret,
  });

  // Loop through the provided users and fetch their data
  for (const user of users) {
    // Fetch user data
    const userData = await client.campaign.getStatistics({
      walletAddress: user.walletAddress,
      twitterAccessToken: user.twitterAccessToken,
    });

    console.log("userData", userData);

    // Push the data corresponding to the provided key as val in the AttestationDataStruct
    Attestations.push({
      about: user.walletAddress,
      key: ethers.utils.toUtf8Bytes(key),
      val: userData["statistics"][key],
    });
  }
  return Attestations;
}

// fetchClientData(addresses, key);

// // Instantiate CliqueClient
// const client = new CliqueClient({
//   env: Environment.Test,
//   apiKey,
//   apiSecret,
// });
// console.log(client);

// const userData = await client.campaign.getStatistics({
//   walletAddress: "0x4401A1667dAFb63Cff06218A69cE11537de9A101",
//   twitterAccessToken: undefined,
// });
// console.log(userData);

// let addresses: UserData[] = [
//   {
//     walletAddress: "0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24",
//     twitterAccessToken: "",
//   },
//   {
//     walletAddress: "0x98e711f31e49c2e50c1a290b6f2b1e493e43ea76",
//     twitterAccessToken: "",
//   },
// ];
// let key = "numNFTsBAYC";
