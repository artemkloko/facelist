# facelist

A minimal facelist app - an app that shows only a list of names and their respective avatars.

Implementation time: about 20 hours from scratch.

## About this repository

This repository consists of two parts:
- `backend` - express server, written with Typescript, fetching data from a "json file database"
- `client` - react-native client, written with Typescript, Hooks, Context, Redux, fetching data from the backend

Both parts have been structured for further development in the best way possible that could understood from the given requirements.

More information on the architecture of the client app can be found in [`client/readme.md`]

## Running the backend

You need to have [`node`] and [`yarn`] installed on a workstation.

```
cd backend
yarn
yarn start
```

## Running the client

You need to have [`node`] and [`yarn`] installed on a workstation and [`expo`] installed on a smartphone.

```
cd client
yarn
yarn start
```

## Running the client tests

You need to have [`node`] and [`yarn`] installed on a workstation.

```
cd client
yarn
yarn test
```


[`client/readme.md`]: client/readme.md
[`node`]: https://nodejs.org/
[`yarn`]: https://yarnpkg.com/
[`expo`]: https://expo.io/