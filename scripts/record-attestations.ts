import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AttestationStation } from "./../typechain-types/";
import { getContractAttestationRegistry } from "./helpers";

export async function recordAttestation(
  contractAdress: string,
  signer: SignerWithAddress,
  attestation: AttestationStation.AttestationDataStruct
) {
  const AttestationStation = await getContractAttestationRegistry(
    contractAdress
  );
  const tx = await AttestationStation.connect(signer).attest([attestation]);
  const receipt = await tx.wait();
  return receipt;
}

export async function recordAttestations(
  contractAdress: string,
  signer: SignerWithAddress,
  attestations: AttestationStation.AttestationDataStruct[]
) {
  const AttestationStation = await getContractAttestationRegistry(
    contractAdress
  );
  const tx = await AttestationStation.connect(signer).attest(attestations);
  const receipt = await tx.wait();
  return receipt;
}
