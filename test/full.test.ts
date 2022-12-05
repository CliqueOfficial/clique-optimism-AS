import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { readValue } from "../scripts/read-attestations";
import {
  recordAttestation,
  recordAttestations,
} from "../scripts/record-attestations";
import { AttestationStation } from "../typechain-types";

const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Test AttestationStation scripts", function () {
  let contract: AttestationStation;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;

  let attestation: AttestationStation.AttestationDataStruct;
  let attestations: AttestationStation.AttestationDataStruct[];
  async function deployAttestationStationFixture() {
    const AttestationStation = await ethers.getContractFactory(
      "AttestationStation"
    );
    const [Owner, Addr1, Addr2, Addr3] = await ethers.getSigners();
    const Contract = await AttestationStation.deploy();
    await Contract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Contract, Owner, Addr1, Addr2, Addr3 };
  }
  beforeEach(async function () {
    const { Contract, Owner, Addr1, Addr2, Addr3 } = await loadFixture(
      deployAttestationStationFixture
    );
    contract = Contract;
    owner = Owner;
    addr1 = Addr1;
    addr2 = Addr2;
    addr3 = Addr3;

    let key = ethers.utils.formatBytes32String("key");
    let value = ethers.utils.formatBytes32String("value");
    attestation = { about: addr1.address, key: key, val: value };
    attestations = [
      { about: addr1.address, key: key, val: value },
      { about: addr2.address, key: key, val: value },
      { about: addr3.address, key: key, val: value },
    ];
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Test readAttestation", async function () {
      await contract.attest(attestations);
      const value = await readValue(
        contract.address,
        owner.address,
        addr1.address,
        ethers.utils.formatBytes32String("key")
      );
      expect(value).to.equal(ethers.utils.formatBytes32String("value"));
    });
    it("Test recordAttestation", async function () {
      const receipt = await recordAttestation(
        contract.address,
        owner,
        attestation
      );
      expect(receipt.events.length).to.equal(1);
      expect(receipt.events[0].event).to.equal("AttestationCreated");
    });
    it("Test recordAttestations", async function () {
      const receipt = await recordAttestations(
        contract.address,
        owner,
        attestations
      );
      expect(receipt.events.length).to.equal(3);
      expect(receipt.events[0].event).to.equal("AttestationCreated");
      expect(receipt.events[1].event).to.equal("AttestationCreated");
      expect(receipt.events[2].event).to.equal("AttestationCreated");
    });
  });
});
