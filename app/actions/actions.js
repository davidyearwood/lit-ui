import Constants from '../constants/constants'


export const setLocation = location => ({
    type: Constants.SET_LOCATION,
    payload: location
})