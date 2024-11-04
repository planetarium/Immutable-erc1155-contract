const { run } = require("hardhat");

async function main() {
    // 배포된 컨트랙트의 주소 입력
    const contractAddress = "0x39e89f5040E6A1dDbD4cC56b721782F30ceCa88d";

    // 컨트랙트 생성자 인자 설정
    const constructorArguments = [
        "IMT1155",
        "IMT1155",
        "https://my-base-uri.com/",
        "0x6b969fd89de634d8de3271ebe97734feffcd58ee",
    ];

    try {
        // 컨트랙트 검증 실행
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: constructorArguments,
        });
        console.log("Verification successful!");
    } catch (error) {
        console.error("Verification failed:", error);
    }
}

// 비동기/에러 핸들링 패턴
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
