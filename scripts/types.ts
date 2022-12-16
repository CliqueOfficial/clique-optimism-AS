import { BytesLike } from "ethers";

export type UserData = {
  walletAddress: string;
  twitterAccessToken: string;
};

export type AttestationData = {
  about: string;
  key: BytesLike;
  val: BytesLike;
};
