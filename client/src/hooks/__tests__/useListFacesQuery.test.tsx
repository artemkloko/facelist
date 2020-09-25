import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import { renderHook, act } from "@testing-library/react-hooks";

import { useListFacesQuery } from "../useListFacesQuery";
import {
  FacesApiResultsAction,
  setFaces,
} from "../../stores/appStateStore/facesApiResults";
import { ApiProvider } from "../../services/api";
import { AppRootState, appStateStore } from "../../stores/appStateStore";

const mockStore = configureMockStore<AppRootState>();

const useProviders = (storeState: AppRootState) => {
  const store = mockStore(storeState);
  const wrapper: React.FC = (props) => (
    <ApiProvider config={{ url: "" }}>
      <Provider store={store}>{props.children}</Provider>
    </ApiProvider>
  );
  return [store, wrapper] as const;
};

describe("useListFacesQuery.execute", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("dispatches SET after execute has fetched data", async () => {
    // mocks
    fetchMock.getOnce("/faces/list?limit=5", {
      body: { data: ["result"] },
      headers: { "content-type": "application/json" },
    });

    // context
    const [store, wrapper] = useProviders({ facesApiResults: {} });

    // action
    const { result } = renderHook(() => useListFacesQuery(), { wrapper });
    await act(() => result.current.execute({ limit: 5 }));

    // expectations
    const expectedActions = [
      {
        type: FacesApiResultsAction.SET,
        payload: { data: ["result"], variables: { limit: 5 } },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe("useListFacesQuery.refetch", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should fetch without nextToken, but with other previous variables", async () => {
    // mocks
    fetchMock.getOnce("/faces/list?limit=2", {
      body: { data: ["result"] },
      headers: { "content-type": "application/json" },
    });

    // context
    const [store, wrapper] = useProviders({
      facesApiResults: { data: { nextToken: "10" }, variables: { limit: 2 } },
    });

    // action
    const { result } = renderHook(() => useListFacesQuery(), { wrapper });
    await act(() => result.current.refetch());

    // expectations
    expect(fetchMock.done()).toEqual(true);
  });
});

describe("useListFacesQuery.fetchMore", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("dispatches APPEND after fetchMore has fetched data", async () => {
    // mocks
    fetchMock.getOnce("/faces/list?limit=10&nextToken=3", {
      body: { data: ["result"] },
      headers: { "content-type": "application/json" },
    });

    // context
    const [store, wrapper] = useProviders({
      facesApiResults: { data: { nextToken: "3" }, variables: { limit: 10 } },
    });

    // action
    const { result } = renderHook(() => useListFacesQuery(), { wrapper });
    await act(() => result.current.fetchMore());

    // expectations
    const expectedActions = [
      {
        type: FacesApiResultsAction.APPEND,
        payload: { data: ["result"], variables: { limit: 10, nextToken: "3" } },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should not fetchMore when nextToken is not available", async () => {
    // context
    const [store, wrapper] = useProviders({
      facesApiResults: { data: { nextToken: null }, variables: { limit: 10 } },
    });

    // action
    const { result } = renderHook(() => useListFacesQuery(), { wrapper });
    await act(() => result.current.fetchMore());

    // expectations
    expect(fetchMock.calls.length).toEqual(0);
  });
});

describe("useListFacesQuery.items", () => {
  it("should reflect the store data on hook init", async () => {
    // context
    const a = { id: "a", avatar: "aAvatar", name: "aName" };
    const b = { id: "b", avatar: "bAvatar", name: "bName" };

    const [store, wrapper] = useProviders({
      facesApiResults: { data: { items: [a, b] } },
    });

    // action
    const { result } = renderHook(() => useListFacesQuery(), { wrapper });

    // expectations
    expect(result.current.items).toEqual([a, b]);
  });

  it("should reflect the store data after store data was altered", async () => {
    // context
    const a = { id: "a", avatar: "aAvatar", name: "aName" };
    const wrapper: React.FC = (props) => (
      <ApiProvider config={{ url: "" }}>
        <Provider store={appStateStore}>{props.children}</Provider>
      </ApiProvider>
    );

    // action
    const { result } = renderHook(
      () => {
        const { items } = useListFacesQuery();
        return items;
      },
      { wrapper }
    );

    act(() => {
      appStateStore.dispatch(setFaces({ data: { items: [a] } }));
    });

    // expectations
    expect(result.current).toEqual([a]);
  });
});
