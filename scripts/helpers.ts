import { Contract } from "ethers";
import { ethers } from "hardhat";

export async function getContractAttestationRegistry(): Promise<Contract> {
  const AttestationStation = new ethers.Contract(
    "0x3Ca8c0B5608AE3E4D3b4d29b2699C5fCc0e67f3d",
    ABI,
    ethers.provider
  );
  return AttestationStation;
}

const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "about",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "val",
        type: "bytes",
      },
    ],
    name: "AttestationCreated",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "about",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "bytes",
            name: "val",
            type: "bytes",
          },
        ],
        internalType: "struct AttestationStation.AttestationData[]",
        name: "_attestations",
        type: "tuple[]",
      },
    ],
    name: "attest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "attestations",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
