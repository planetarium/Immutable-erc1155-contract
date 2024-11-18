const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test Erc1155", function () {
    let IMT1155, imt1155;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        IMT1155 = await ethers.getContractFactory("TEST1155");
        imt1155 = await IMT1155.deploy("TestToken", "TT", "https://example.com/");
        await imt1155.deployed();
    });

    it("Should set the correct name, symbol, and URI", async function () {
        expect(await imt1155.name()).to.equal("TestToken");
        expect(await imt1155.symbol()).to.equal("TT");
        expect(await imt1155.uri(1)).to.equal("https://example.com/1.json");
    });

    it("Should allow owner to set new URI", async function () {
        const newURI = "https://newexample.com/"
        await expect(imt1155.connect(addr1).setURI(newURI)).to.be.revertedWith("Ownable: caller is not the owner");

        await imt1155.connect(owner).setURI(newURI);
        expect(await imt1155.uri(1)).to.equal(newURI + "1.json");
    });

    it("Should allow owner to set setTransferEnabled", async function () {
        await expect(imt1155.connect(addr1).setTransferEnabled(true)).to.be.revertedWith("Ownable: caller is not the owner");

        await imt1155.setTransferEnabled(true);
        expect(await imt1155.transferEnabled()).to.equal(true);
    });

    it("Should allow only minter to mint tokens", async function () {
        await expect(imt1155.connect(addr1).mint(addr1.address, 1, 100, "0x")).to.be.revertedWith("Not authorized");

        await imt1155.mint(addr2.address, 1, 100, "0x");
        expect(await imt1155.balanceOf(addr2.address, 1)).to.equal(100);
        expect(await imt1155.uri(1)).to.equal("https://example.com/1.json");
    });

    it("Should allow only minter to burn tokens", async function () {
        await imt1155.mint(addr1.address, 1, 100, "0x");

        await expect(imt1155.connect(addr1).burn(addr1.address, 1, 50)).to.be.revertedWith("Not authorized");

        await imt1155.burn(addr1.address, 1, 50);
        expect(await imt1155.balanceOf(addr1.address, 1)).to.equal(50);
    });

    it("Should allow only minter to burn batch of tokens", async function () {
        await imt1155.mint(addr1.address, 1, 100, "0x");
        await imt1155.mint(addr1.address, 2, 200, "0x");

        await expect(imt1155.connect(addr1).burnBatch(addr1.address, [1, 2], [50, 100])).to.be.revertedWith("Not authorized");

        await imt1155.burnBatch(addr1.address, [1, 2], [50, 100]);

        expect(await imt1155.balanceOf(addr1.address, 1)).to.equal(50);
        expect(await imt1155.balanceOf(addr1.address, 2)).to.equal(100);
    });

    it("Should prevent transfers when transferEnabled is false", async function () {
        await imt1155.mint(addr1.address, 1, 100, "0x");

        await expect(imt1155.connect(addr1).safeTransferFrom(addr1.address, addr2.address, 1, 50, "0x")).to.be.revertedWith("Token cannot be transferred");

        await imt1155.setTransferEnabled(true);
        await imt1155.connect(addr1).safeTransferFrom(addr1.address, addr2.address, 1, 50, "0x");
        expect(await imt1155.balanceOf(addr2.address, 1)).to.equal(50);
    });


    it("Should allow owner to set new minter", async function () {
        await imt1155.setMinter(addr1.address);

        await imt1155.connect(addr1).mint(addr2.address, 2, 100, "0x");
        expect(await imt1155.balanceOf(addr2.address, 2)).to.equal(100);
    });

    it("Should allow only owner to set new minter", async function () {
        await expect(imt1155.connect(addr1).setMinter(addr1.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow owner to update the baseURI and reflect in token URIs", async function () {
        const newBaseURI = "https://newexample.com/";
        await expect(imt1155.connect(addr1).setURI(newBaseURI)).to.be.revertedWith("Ownable: caller is not the owner");

        await imt1155.connect(owner).setURI(newBaseURI);

        // Verify the updated URI for a token
        expect(await imt1155.uri(1)).to.equal("https://newexample.com/1.json");
        expect(await imt1155.uri(2)).to.equal("https://newexample.com/2.json");
    });
});
