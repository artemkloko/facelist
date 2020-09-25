import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Provider, useSelector } from "react-redux";

import { appStateStore } from "../..";
import { FacesApiResultsAction } from "../actions";
import { facesApiResultsReducer } from "../reducer";

describe("facesApiResultsReducer", () => {
  it("should be mounted on rootReducer with proper key", async () => {
    // context
    const wrapper: React.FC = (props) => (
      <Provider store={appStateStore}>{props.children}</Provider>
    );

    // action
    const { result } = renderHook(() => useSelector((state) => state), {
      wrapper,
    });

    // expectations
    expect(result.current).toHaveProperty("facesApiResults");
  });

  it("should handle SET", () => {
    // context
    const payload = { data: { items: [] }, variables: { limit: 5 } };

    // action
    const state = facesApiResultsReducer(
      { data: { nextToken: null }, variables: {} },
      { type: FacesApiResultsAction.SET, payload }
    );

    // expectations
    expect(state).toEqual(payload);
  });

  it("should handle APPEND", () => {
    // context
    const a = { id: "a", avatar: "aAvatar", name: "aName" };
    const b = { id: "b", avatar: "bAvatar", name: "bName" };
    const nextToken = null;
    const variables = { nextToken: "1" };

    // action
    const state = facesApiResultsReducer(
      { data: { items: [a], nextToken: "1" }, variables: {} },
      {
        type: FacesApiResultsAction.APPEND,
        payload: { data: { items: [b], nextToken }, variables },
      }
    );

    // expectations
    expect(state).toEqual({ data: { items: [a, b], nextToken }, variables });
  });
});
