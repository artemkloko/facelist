import { Reducer } from "redux";

import {
  FaceFragment,
  ListFacesQueryResult,
  ListFacesQueryVariables,
} from "../../../@types/api";
import { FacesApiResultsActions, FacesApiResultsAction } from "./actions";

export type FacesApiResultsStoreState = {
  data?: ListFacesQueryResult;
  variables?: ListFacesQueryVariables;
};

const initialState: FacesApiResultsStoreState = {};

export const facesApiResultsReducer: Reducer<
  FacesApiResultsStoreState,
  FacesApiResultsActions
> = (state = initialState, action) => {
  if (action.type === FacesApiResultsAction.SET) {
    return {
      data: action.payload.data,
      variables: action.payload.variables,
    };
  } else if (action.type === FacesApiResultsAction.APPEND) {
    let items: FaceFragment[] = [];
    if (state.data?.items) {
      items = [...state.data.items];
    }
    if (action.payload.data.items) {
      items = [...items, ...action.payload.data.items];
    }
    return {
      data: { ...state.data, items, nextToken: action.payload.data.nextToken },
      variables: action.payload.variables,
    };
  }

  return state;
};
