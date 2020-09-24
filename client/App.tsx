import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";

import config from "./src/api-secrets";
import { ApiProvider } from "./src/services/api";
import { appStateStore } from "./src/stores/appStateStore";

import { FacelistScreen } from "./src/screens/FacelistScreen";

const App: React.FC = () => {
  return (
    <ApiProvider config={config}>
      <Provider store={appStateStore}>
        <FacelistScreen />
        <StatusBar style="auto" />
      </Provider>
    </ApiProvider>
  );
};

export default App;
