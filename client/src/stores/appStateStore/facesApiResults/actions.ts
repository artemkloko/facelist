import { Action } from "redux";

import {
  ListFacesQueryResult,
  ListFacesQueryVariables,
} from "../../../@types/api";

export enum FacesApiResultsAction {
  "SET" = "SET",
  "APPEND" = "APPEND",
}

interface SetAction extends Action {
  type: FacesApiResultsAction.SET;
  payload: {
    data: ListFacesQueryResult;
    variables?: ListFacesQueryVariables;
  };
}

interface AppendAction extends Action {
  type: FacesApiResultsAction.APPEND;
  payload: {
    data: ListFacesQueryResult;
    variables?: ListFacesQueryVariables;
  };
}

export type FacesApiResultsActions = SetAction | AppendAction;

export const setFaces = (payload: SetAction["payload"]): SetAction => ({
  type: FacesApiResultsAction.SET,
  payload,
});

export const appendFaces = (
  payload: AppendAction["payload"]
): AppendAction => ({
  type: FacesApiResultsAction.APPEND,
  payload,
});
