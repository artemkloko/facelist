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

export const useListFacesQuery = () => {
  const apiQuery = useApiQuery<ListFacesQueryResult, ListFacesQueryVariables>(
    "/faces/list"
  );
  const facesStore = useSelector(getfacesApiResultsStore);
  const dispatch = useDispatch<typeof appStateStore.dispatch>();
  const [loading, setLoading] = useState<boolean>(false);

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

  const refetch = useCallback(() => {
    return execute({ ...facesStore.variables, nextToken: undefined });
  }, [execute, facesStore.variables]);

  const fetchMore = useCallback(async () => {
    if (!facesStore.data?.nextToken) {
      return;
    }

    setLoading(true);
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

  const items = useMemo(() => facesStore.data?.items || [], [facesStore]);

  return { items, loading, execute, refetch, fetchMore };
};
