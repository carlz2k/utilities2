module.exports = {
    "setupFiles": ["jest-localstorage-mock"],
    "setupFilesAfterEnv": [],
    "collectCoverage": true,
    "testURL": "http://ping.com/",
    "testMatch": ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)", "**/?(*Test).[jt]s?(x)"],
    "moduleNameMapper": {
        "\\.(scss|css)$": "<rootDir>/src/__mocks__/styleMock.js",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "@pingone/jest-stubs"
    },
    "resetModules": true,
    "verbose": false,
    "testRunner": "jest-jasmine2",
    "testEnvironment": "jsdom"
};
