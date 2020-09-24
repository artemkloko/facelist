import React, { useEffect } from "react";

import { useListFacesQuery } from "../hooks/useListFacesQuery";
import { FacesList } from "../components/FacesList";

export const FacelistScreen: React.FC = () => {
  const query = useListFacesQuery();

  /**
   * Data related operations should be implemented here
   */

  useEffect(() => {
    query.execute();
  }, []);

  return (
    <FacesList
      data={query.items}
      onRefresh={query.refetch}
      onEndReached={query.fetchMore}
      refreshing={query.loading}
    />
  );
};
