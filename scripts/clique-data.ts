import { CliqueClient } from "../clique-sdk/src";

const apiKey = process.env.CLIQUE_API_KEY || "";
const apiSecret = process.env.CLIQUE_API_SECRET || "";

export async function fetchClientData() {
  const client = new CliqueClient({
    apiKey,
    apiSecret,
  });

  client.twitter
    .getOAuth2Link({
      client_id: "",
      redirect_uri: "",
    })
    .then((data: any) => {
      console.log(data);
    });

  client.campaign
    .getStatistics({
      walletAddress: "",
      twitterAccessToken: "",
    })
    .then((data: any) => {
      // Call a function to parse the data and create Attestation Structs from it
      console.log(data);
    });
}
