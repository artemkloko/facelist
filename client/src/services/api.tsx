import React, { createContext, useCallback, useContext } from "react";

import { Response } from "../@types/api";

/*******************************************************************************
 * context / store
 ******************************************************************************/

export type ApiContextState = { config: { url: string } };

/**
 * Context that stores api related configuration and makes it available through
 * out the app.
 */
const ApiContext = createContext<Partial<ApiContextState>>({});

/*******************************************************************************
 * provider / initialization
 ******************************************************************************/

export type ApiProviderProps = Pick<ApiContextState, "config">;

/**
 * Context Provider for ApiContext.
 */
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

/*******************************************************************************
 * hooks
 ******************************************************************************/

/**
 * Provides the api configuration of the closest `ApiProvider`.
 */
export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!isApiContextState(context)) {
    throw new Error(
      "ApiContext was not properly initialized. " +
        "Please make sure to wrap your apiQuery with ApiProvider."
    );
  }
  return context;
};

/**
 * Provides a function that fetches data from a specific api url by utilizing
 * `useApiContext`.
 */
export const useApiQuery = <
  QueryResult extends {},
  QueryVariables extends { [key: string]: any }
>(
  url: string
) => {
  const { config } = useApiContext();

  /**
   * Fetches data from a url specified in parent `useApiQuery`.
   */
  const execute = useCallback(
    async (variables?: QueryVariables): Promise<Response<QueryResult>> => {
      let params = "";

      if (variables && Object.keys(variables).length > 0) {
        /**
         * If variables are available:
         * - filter out the `undefined` ones (`null`s are still kept)
         * - create queryString pairs with uri encoding
         * - join them in one string
         */
        const possibleParams = Object.keys(variables)
          .filter((key) => typeof variables[key] !== "undefined")
          .map((key) => `${key}=${encodeURIComponent(variables[key])}`)
          .join("&");
        if (possibleParams.length > 0) {
          params += "?" + possibleParams;
        }
      }

      const response = await fetch(config.url + url + params);
      const result = await response.json();
      return result;
    },
    [config.url]
  );

  /**
   * Different types of api requests should be implemented here.
   */

  return execute;
};

/*******************************************************************************
 * utils
 ******************************************************************************/

const isApiContextState = (
  state: Partial<ApiContextState>
): state is ApiContextState => !!state.config;
