import React, { createContext, useContext } from "react";

import { Response } from "../@types/api";

export type ApiClientConfig = {
  url: string;
};

/**
 * context / store
 */

const ApiContext = createContext<{ config?: ApiClientConfig }>({});

/**
 * provider / initialization
 */

export type ApiProviderProps = {
  config: ApiClientConfig;
};

export const ApiProvider: React.FC<ApiProviderProps> = (props) => {
  /**
   * Authenticaton should be implemented here. Anything needed by authentication
   * should be provided in the props.
   */

  return (
    <ApiContext.Provider value={{ config: props.config }}>
      {props.children}
    </ApiContext.Provider>
  );
};

/**
 * hooks
 */

export const useApiQuery = <
  QueryResult extends {},
  QueryVariables extends { [key: string]: any }
>(
  url: string
) => {
  const { config } = useContext(ApiContext);

  if (!config) {
    throw new Error(
      "ApiContext was not properly initialized. " +
        "Please make sure to wrap your apiQuery with ApiProvider."
    );
  }

  const execute = async (
    variables?: QueryVariables
  ): Promise<Response<QueryResult>> => {
    let params = "";
    if (variables && Object.keys(variables).length > 0) {
      params += "?";
      params += Object.keys(variables)
        .map((key) => `${key}=${encodeURIComponent(variables[key])}`)
        .join("&");
    }

    try {
      const response = await fetch(config.url + url + params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return execute;
};
