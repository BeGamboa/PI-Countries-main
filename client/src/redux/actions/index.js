import axios from "axios";

export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const COUNTRY_DETAILS = "COUNTRY_DETAILS";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const ALL_ACTIVITIES = "ALL_ACTIVITIES";
export const CLEAR_PAGE = "CLEAR_PAGE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";

export const getCountries = (name) => {
    return async (dispatch) => {
        try{
            if(name){
                let countryByName = await axios.get(`http://localhost:3001/countries?name=${name}`);
                dispatch({
                    type: ALL_COUNTRIES,
                    payload: countryByName.data
                });
            }else{
                let allCountries = await axios.get("http://localhost:3001/countries");
                dispatch({
                    type: ALL_COUNTRIES,
                    payload: allCountries.data
                })
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }
};

export const getDetails = (id) => {
    return async (dispatch) => {
        try{
            let countryById = await axios.get("http://localhost:3001/countries/"+id);
            dispatch({
                type: COUNTRY_DETAILS,
                payload: countryById.data
            });
        }catch(error){
            console.log(error);
            return error;
        }    
    }
};

export const createActivity = ({ name, difficulty, duration, season, countries }) => {
    return async (dispatch) => {
        try{
            let actCreated = await axios.post("http://localhost:3001/activity", { name, difficulty, duration, season, countries });
            dispatch({
                type: CREATE_ACTIVITY,
                payload: actCreated
            });
        }catch(error){
            console.log(error);
            return error;
        }
    }
};

export const getActivities = () => {
    return async (dispatch) => {
        await axios.get("http://localhost:3001/activities")
        .then(response => dispatch({ type: ALL_ACTIVITIES, payload: response.data }))
        .catch(error => console.log(error))       
    }
};

export const clearPage = (payload) => {
    return{
        type: CLEAR_PAGE,
        payload
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
};

export const filterContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
};

export const filterActivity = (payload) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
};

