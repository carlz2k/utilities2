const presets = [
    ["@babel/env", {
        targets: {
            chrome: "77",
            firefox: "72",
            safari: "12",
            edge: "79"
        }
    }],
    "@babel/preset-react"
];

const plugins = [
    "lodash",
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-proposal-object-rest-spread"]
];

module.exports = { presets, plugins };
