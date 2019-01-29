import Actions from "../constants/actions";
import ViewMode from "../constants/viewMode";

const initialState = {
  deviceId: "",
  deviceLocation: "",
  errorMessage: null,
  isMapReady: false,
  info: {
    name: "Some Random Name"
  },
  places: [
    {
      id: 1,
      location: {
        lat: 45.429895,
        lng: -75.72688
      },
      name: "Les Brasseurs du Temps",
      litness: 0
    },
    {
      id: 2,
      location: {
        lat: 45.425857,
        lng: -75.716912
      },
      name: "Les vilains garçons",
      litness: 1
    },
    {
      id: 3,
      location: {
        lat: 45.42816,
        lng: -75.724651
      },
      name: "Solif Bar à vin",
      litness: 3
    },
    {
      id: 4,
      location: {
        lat: 45.427019,
        lng: -75.71927
      },
      name: "Le Cellier",
      litness: 6
    }
  ],
  region: {
    lat: 45.427606,
    lng: -75.721545,
    latDelta: 0.0922,
    lngDelta: 0.0421
  },
  token: "",
  viewMode: ViewMode.MAP
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CHANGE_VIEW:
      return {
        ...state,
        viewMode: action.payload
      };
    case Actions.MAP_IS_READY:
      return {
        ...state,
        isMapReady: action.payload
      };
    case Actions.SET_INFO:
      return {
        ...state,
        info: action.payload
      };
    case Actions.SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload
      };
    case Actions.SET_REGION:
      return {
        ...state,
        region: action.payload
      };
    case Actions.SET_PLACES:
      return {
        ...state,
        places: action.payload
      };
    case Actions.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case Actions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
