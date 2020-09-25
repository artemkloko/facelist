# facelist client

This is the react-native client for the facelist app. 

## Architecture

Following are the most important components of this app. Please read through before exploring the source of the project.

### Api provision

[`ApiContext`] - a Context that stores api related configuration and makes it available through out the app.

[`ApiProvider`] - a Context Provider for `ApiContext`.

[`useApiContext`] - a Hook that provides the api configuration of the closest `ApiProvider`.

[`useApiQuery`] - a Hook that provides a function that fetches data from a specific api url by utilizing `useApiContext`.

### Data storage

[`appStateStore`] - a Redux store containing the app state.

[`facesApiResults`] - a Redux substore that contains the data fetched from the "faces api".

[`facesApiResultsReducer`] - a Redux Reducer that manipulates `facesApiResults` substore.

### Faces api

[`useListFacesQuery`] - a Hook that can fetch "faces data" from the "faces api" by utilizing `useApiQuery` and store that data by untilizing `facesApiResultsReducer`.

[`ApiContext`]: src/services/api.tsx
[`ApiProvider`]: src/services/api.tsx
[`useApiContext`]: src/services/api.tsx
[`useApiQuery`]: src/services/api.tsx
[`appStateStore`]: src/stores/appStateStore/index.ts
[`facesApiResults`]: src/stores/appStateStore/index.ts
[`facesApiResultsReducer`]: src/stores/appStateStore/facesApiResults/reducer.ts
[`useListFacesQuery`]: src/hooks/useListFacesQuery.ts