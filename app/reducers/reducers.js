import Constants from '../constants/constants';
import ViewMode from '../constants/viewMode'


const initialState = {
    deviceId: '',
    errorMessage: null,
    isMapReady: false,
    info: {
        name: 'Some Random Name'
    },
    places: [
        {
            location: {
                latitude: 45.429895,
                longitude: -75.726880
            },
            name: "Les Brasseurs du Temps",
            litness: 0,
            checkedInCount: 44
        },
        {
            location: {
                latitude: 45.425857,
                longitude: -75.716912
            },
            name: "Les vilains garçons",
            litness: 1,
            checkedInCount: 22
        },
        {
            location: {
                latitude: 45.428160,
                longitude: -75.724651
            },
            name: "Solif Bar à vin",
            litness: 3,
            checkedInCount: 24
        },
        {
            location: {
                latitude: 45.427019,
                longitude: -75.719270
            },
            name: "Le Cellier",
            litness: 6,
            checkedInCount: 44
        }
    ],
    region: {
        latitude: 45.427606,
        longitude: -75.721545,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    viewMode: ViewMode.MAP,
};


const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case Constants.CHANGE_VIEW:
            return {
                ...state,
                viewMode: action.payload
            };
        case Constants.MAP_IS_READY:
            return {
                ...state,
                isMapReady: action.payload
            };
        case Constants.SET_INFO:
            return {
                ...state,
                info: action.payload
            };
        case Constants.SET_DEVICE_ID:
            return {
                ...state,
                deviceId: action.payload
            };
        case Constants.SET_REGION:
            return {
                ...state, 
                region: action.payload
            };
        default:
            return state;
    }
};


export default rootReducer;