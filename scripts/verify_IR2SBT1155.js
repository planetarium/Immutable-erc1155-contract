const { run } = require("hardhat");

async function main() {
    // 배포된 컨트랙트의 주소 입력
    const contractAddress = "<>"

    /*
     * OAL Address Check
     * Testnet = 0x6b969fd89de634d8de3271ebe97734feffcd58ee
     * Mainnet = 0x5f5eba8133f68ea22d712b0926e2803e78d89221
     */
    // Chain 별 oalAddress 인지 check
    const oalAddress = '0x6b969fd89de634d8de3271ebe97734feffcd58ee'

    /*
     * Base Uri 주소 확인
     * Testnet = https://ir2-resourece-dev.s3.us-east-2.amazonaws.com/sbt-metadata/
     * Mainnet = https://ir2-sbt.com/sbt-metadata/
     */

    const baseUri = "https://ir2-resourece-dev.s3.us-east-2.amazonaws.com/sbt-metadata/"

    const constructorArguments = [
        "IR2SBT1155",
        "IR2SBT",
        baseUri,
        oalAddress,
    ];

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: constructorArguments,
        });
        console.log("Verification successful!");
    } catch (error) {
        console.error("Verification failed:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
