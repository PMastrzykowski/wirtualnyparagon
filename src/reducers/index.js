import { combineReducers } from 'redux';
import landingReducer from './landingReducer';

export default combineReducers({
    landing: landingReducer
});