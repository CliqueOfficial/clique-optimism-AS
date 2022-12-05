import { AttestationStation } from "./../typechain-types/";
import { getContractAttestationRegistry } from "./helpers";

async function recordAttestation(
  attestation: AttestationStation.AttestationDataStruct
) {
  const AttestationStation = await getContractAttestationRegistry();
  const tx = await AttestationStation.attest(attestation);
  const receipt = await tx.wait();
  return receipt;
}

async function recordAttestations(
  attestations: [AttestationStation.AttestationDataStruct]
) {
  const AttestationStation = await getContractAttestationRegistry();
  const tx = await AttestationStation.attest(attestations);
  const receipt = await tx.wait();
  return receipt;
}
