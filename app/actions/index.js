import Actions from "../constants/actions";
import fetch from "cross-fetch";

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

export const requestPlaces = () => ({
  type: Actions.FETCH_PLACES_REQUEST
});

export const receivePlaces = places => ({
  type: Actions.FETCH_PLACES_SUCCESS,
  payload: places
});

export const failToReceivePlaces = error => ({
  type: Actions.FETCH_PLACES_FAILURE,
  payload: error
});

/* 
  {
    lat: Number,
    lng: Number,
    radius: Number
  }
*/
export function fetchPlaces(location) {
  return function(dispatch) {
    // Let State know that I am fetching for places
    dispatch(requestPlaces());

    let api_url = new URL(
      "https://litapi.projectunicorn.net/api/locations?lat"
    );

    let params = {
      lat: location.lat,
      lng: location.lng,
      radius: location.radius
    };

    api_url.search = new URLSearchParams(params);

    return fetch(api_url)
      .then(
        response => response.json(),
        error => dispatch(failToReceivePlaces(error))
      )
      .then(places => dispatch(receivePlaces(places)));
  };
}
