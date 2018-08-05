import Constants from '../constants/constants'


const initialState = {
    location: {
        coords: {
            latitude: 37.78825,
            longitude: -122.4324,
        }
    },
    errorMessage: null,
}


const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case Constants.SET_LOCATION:
            return {...state, location: action.payload}
        default:
            return state
    }
}


export default rootReducer