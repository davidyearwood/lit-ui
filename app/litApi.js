import axios from "axios";

const API_URL = "https://litapi.projectunicorn.net/api/";

export default {
  getLocations(lat, lng, radius = 10000) {
    const url = API_URL + "locations/";
    return axios
      .get(url, {
        params: {
          lat: lat,
          lng: lng,
          radius: radius
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  setDeviceLocation(deviceId, locationId) {
    const url = API_URL + "set-device-location/";
    axios
      .post(url, {
        id: deviceId,
        place_id: locationId
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};
