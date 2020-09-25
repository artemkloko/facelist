import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListFacesQueryResult, ListFacesQueryVariables } from "../@types/api";
import { useApiQuery } from "../services/api";
import { appStateStore } from "../stores/appStateStore";
import {
  setFaces,
  appendFaces,
  getfacesApiResultsStore,
} from "../stores/appStateStore/facesApiResults";

/**
 * Can fetch "faces data" from the "faces api" by utilizing `useApiQuery` and 
 * store that data by untilizing `facesApiResultsReducer`.
 */
export const useListFacesQuery = () => {
  const apiQuery = useApiQuery<ListFacesQueryResult, ListFacesQueryVariables>(
    "/faces/list"
  );
  const facesStore = useSelector(getfacesApiResultsStore);
  const dispatch = useDispatch<typeof appStateStore.dispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Executes the query to start fetching the data.
   */
  const execute = useCallback(
    async (variables?: ListFacesQueryVariables) => {
      setLoading(true);
      
      const result = await apiQuery(variables);

      if (result.error) {
        throw new Error(result.error);
      } else if (result.data) {
        dispatch(setFaces({ data: result.data, variables }));
      }

      setLoading(false);
    },
    [setLoading, apiQuery, dispatch, setFaces]
  );

  /**
   * Executes the query with previously used `variables`, but without 
   * `nextToken`.
   */
  const refetch = useCallback(() => {
    return execute({ ...facesStore.variables, nextToken: undefined });
  }, [execute, facesStore.variables]);

  /**
   * Executes the query with previously used `variables`, and the `nextToken` 
   * that was received from the previous execution of this query.
   * 
   * If no `nextToken` can be found (ie. list was fully fetched, the query was 
   * not executed yet) this function will not execute and will just return.
   */
  const fetchMore = useCallback(async () => {
    if (!facesStore.data?.nextToken) {
      return;
    }

    setLoading(true);

    /**
     * Keep same variables, but use the received `nextToken`.
     */
    const variables = {
      ...facesStore.variables,
      nextToken: facesStore.data.nextToken,
    };
    const result = await apiQuery(variables);

    if (result.error) {
      throw new Error(result.error);
    } else if (result.data) {
      dispatch(appendFaces({ data: result.data, variables }));
    }

    setLoading(false);
  }, [facesStore, setLoading, apiQuery]);

  /**
   * Query items memoized from the storage.
   */
  const items = useMemo(() => facesStore.data?.items || [], [facesStore]);

  return { items, loading, execute, refetch, fetchMore };
};
