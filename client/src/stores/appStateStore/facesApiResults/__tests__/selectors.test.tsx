import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Provider, useSelector } from "react-redux";
import configureMockStore from "redux-mock-store";

import { AppRootState } from "../..";
import { getfacesApiResultsStore } from "../selectors";

const mockStore = configureMockStore<AppRootState>();

const useProviders = (storeState: AppRootState) => {
  const store = mockStore(storeState);
  const wrapper: React.FC = (props) => (
    <Provider store={store}>{props.children}</Provider>
  );
  return [store, wrapper] as const;
};

describe("facesApiResults", () => {
  it("execute without params", async () => {
    // mocks

    const a = { id: "a", avatar: "aAvatar", name: "aName" };
    const reducerData = { data: { items: [a] } };
    const [store, wrapper] = useProviders({ facesApiResults: reducerData });

    // action
    const { result } = renderHook(() => useSelector(getfacesApiResultsStore), {
      wrapper,
    });

    // expectations
    expect(result.current).toEqual(reducerData);
  });
});
