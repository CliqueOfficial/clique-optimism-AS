import { Address } from "cluster";
import { Bytes, BytesLike } from "ethers";
import { getContractAttestationRegistry } from "./helpers";

// Read the value of an Attestation
async function readValue(
  creator: Address,
  receiver: Address,
  key: Bytes
): Promise<BytesLike> {
  const AttestationStation = await getContractAttestationRegistry();
  const value = await AttestationStation.attestations(creator, receiver, key);
  return value;
}
