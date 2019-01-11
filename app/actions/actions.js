import Constants from "../constants/constants";

export const changeView = viewMode => ({
  type: Constants.CHANGE_VIEW,
  payload: viewMode
});

export const mapIsReady = ready => ({
  type: Constants.MAP_IS_READY,
  payload: ready
});

export const setDeviceId = id => ({
  type: Constants.SET_DEVICE_ID,
  payload: id
});

export const setInfo = info => ({
  type: Constants.SET_INFO,
  payload: info
});

export const setRegion = region => ({
  type: Constants.SET_REGION,
  payload: region
});

export const setPlaces = places => ({
  type: Constants.SET_PLACES,
  payload: places
});
