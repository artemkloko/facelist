import { useMemo, useState } from "react";
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

  const execute = async (variables?: ListFacesQueryVariables) => {
    setLoading(true);
    const result = await apiQuery(variables);

    if (result.error) {
      throw new Error(result.error);
    }

    result.data && dispatch(setFaces({ data: result.data, variables }));
    setLoading(false);
  };

  const refetch = () => {
    execute({ ...facesStore.variables, nextToken: undefined });
  };

  const fetchMore = async () => {
    if (!facesStore.data?.nextToken) {
      return;
    }

    setLoading(true);
    const variables = {
      ...facesStore.variables,
      nextToken: facesStore.data.nextToken,
    };
    const result = await apiQuery(variables);

    result.data && dispatch(appendFaces({ data: result.data, variables }));
    setLoading(false);
  };

  const items = useMemo(() => facesStore.data?.items || [], [facesStore]);

  return { items, loading, execute, refetch, fetchMore };
};
