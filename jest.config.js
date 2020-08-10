module.exports = {
    name: "react-online-hook",
    setupFilesAfterEnv: ["jest-enzyme"],
    testEnvironment: "enzyme",
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!react-online-hook)"
    ]
}