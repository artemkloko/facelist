import Constants from "expo-constants";

const { manifest } = Constants;
const host = manifest.debuggerHost
  ? manifest.debuggerHost.split(":").shift()
  : "localhost";

const config = {
  url: `http://${host}:3000/api`,
};

export default config;
