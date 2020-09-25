import React from "react";
import fetchMock from "fetch-mock";
import { renderHook, act } from "@testing-library/react-hooks";

import { ApiProvider, useApiContext, useApiQuery } from "../../services/api";

const useProviders = () => {
  const wrapper: React.FC = (props) => (
    <ApiProvider config={{ url: "" }}>{props.children}</ApiProvider>
  );
  return wrapper;
};

describe("api.useApiContext", () => {
  it("should return context that it has been wrapped with", async () => {
    // context
    const wrapper: React.FC = (props) => (
      <ApiProvider config={{ url: "WRONG_URL" }}>
        <ApiProvider config={{ url: "ANOTHER_WRONG_URL" }}>
          {props.children}
        </ApiProvider>
        <ApiProvider config={{ url: "CORRECT_URL" }}>
          {props.children}
        </ApiProvider>
      </ApiProvider>
    );

    // action
    const { result } = renderHook(() => useApiContext(), { wrapper });

    // expectations
    expect(result.current.config).toEqual({ url: "CORRECT_URL" });
  });

  it("should throw if used without Provider", async () => {
    // action
    const { result } = renderHook(() => useApiContext());

    // expectations
    expect(result.error).toBeInstanceOf(Error);
  });
});

describe("api.useApiQuery", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("execute without params", async () => {
    // mocks
    fetchMock.getOnce("/api", {
      body: { data: ["result"] },
      headers: { "content-type": "application/json" },
    });

    const wrapper = useProviders();
    const { result } = renderHook(() => useApiQuery("/api"), { wrapper });

    // action
    await act(async () => {
      await result.current();
    });

    // expectations
    expect(fetchMock.done()).toEqual(true);
  });

  it("execute with params", async () => {
    // mocks
    fetchMock.getOnce("/api?key=value", {
      body: { data: ["result"] },
      headers: { "content-type": "application/json" },
    });

    const wrapper = useProviders();
    const { result } = renderHook(() => useApiQuery("/api"), { wrapper });

    // action
    await act(async () => {
      await result.current({ key: "value" });
    });

    // expectations
    expect(fetchMock.done()).toEqual(true);
  });

  it("should throw when address is unreachable", async () => {
    // mocks
    fetchMock.getOnce("/api", {
      throws: new TypeError("Failed to fetch"),
    });

    const wrapper = useProviders();

    // action
    const { result } = renderHook(
      () => {
        const query = useApiQuery("/api");
        return query();
      },
      { wrapper }
    );

    // expectations
    try {
      await result.current;
      fail();
    } catch (error) {
      expect(error).toEqual(TypeError("Failed to fetch"));
    }
  });

  it("should throw when response is not json", async () => {
    // mocks
    fetchMock.getOnce("/api", {
      body: "text",
    });

    const wrapper = useProviders();

    // action
    const { result } = renderHook(
      () => {
        const query = useApiQuery("/api");
        return query();
      },
      { wrapper }
    );

    // expectations
    try {
      await result.current;
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
