import { BytesLike } from "ethers";
import { getContractAttestationRegistry } from "./helpers";

// Read the value of an Attestation
export async function readValue(
  contractAddress: string,
  creator: string,
  receiver: string,
  key: BytesLike
): Promise<BytesLike> {
  const AttestationStation = await getContractAttestationRegistry(
    contractAddress
  );
  const value = await AttestationStation.attestations(creator, receiver, key);
  return value;
}
