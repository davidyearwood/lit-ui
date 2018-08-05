import Constants from '../constants/constants'


const initialState = {
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    errorMessage: null,
}


const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case Constants.SET_REGION:
            return {...state, region: action.payload}
        default:
            return state
    }
}


export default rootReducer