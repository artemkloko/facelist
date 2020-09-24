import { combineReducers, createStore } from "redux";

import { facesApiResultsReducer } from "./facesApiResults/reducer";

const rootReducer = combineReducers({
  facesApiResults: facesApiResultsReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const appStateStore = createStore(rootReducer);
