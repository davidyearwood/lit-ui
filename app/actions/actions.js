import Constants from '../constants/constants';


export const changeView = viewMode => ({
   type: Constants.CHANGE_VIEW,
   payload: viewMode
});


export const setRegion = region => ({
    type: Constants.SET_REGION,
    payload: region
});