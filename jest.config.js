// Desc: Jest configuration file to read environment variables from .env.development.local
require("dotenv").config({ path: ".env.development.local" });

module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFiles: ["dotenv/config"],
  // testEnvironment: "jest-environment-jsdom",
};
