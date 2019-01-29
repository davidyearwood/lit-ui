import Actions from "../constants/actions";

export const mapIsReady = ready => ({
  type: Actions.MAP_IS_READY,
  payload: ready
});

export const setError = error => ({
  type: Actions.SET_ERROR,
  payload: error
});

export const setInfo = info => ({
  type: Actions.SET_INFO,
  payload: info
});

export const setPlaces = places => ({
  type: Actions.SET_PLACES,
  payload: places
});

export const setRegion = region => ({
  type: Actions.SET_REGION,
  payload: region
});

export const setToken = token => ({
  type: Actions.SET_TOKEN,
  payload: token
});

export const setView = view => ({
  type: Actions.SET_VIEW,
  payload: view
});
