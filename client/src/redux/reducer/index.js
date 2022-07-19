import {
    ALL_COUNTRIES,
    COUNTRY_DETAILS,
    CREATE_ACTIVITY,
    ALL_ACTIVITIES,
    CLEAR_PAGE,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
} from "../actions/index";

const initialSate = {
    countries: [],
    countryDetails: {},
    activities: [],
}

export default function rootReducer (state = initialSate, { type, payload }) {
    switch(type){
        case ALL_COUNTRIES:
            return{
                ...state,
                countries: payload
            }
        case COUNTRY_DETAILS:
            return{
                ...state,
                countryDetails: payload
            }
        case CREATE_ACTIVITY:
            return{
                ...state
            }
        case ALL_ACTIVITIES:
            return{
                ...state,
                activities: payload
            }
        case CLEAR_PAGE:
            return{
                ...state,
                countryDetails: {}
            }
        case ORDER_BY_NAME:
            const nameSort = payload ==="ascending" ?
                state.countries.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) : 
                state.countries.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: nameSort
            }
        case ORDER_BY_POPULATION:
            const populationSort = payload === "increasing" ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                })  : 
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: populationSort
            }
        case FILTER_BY_CONTINENT:
            const everyCountry = state.countries;
            const continentFiltered = payload === "All" ? everyCountry : everyCountry.filter(el => el.continent === payload)
            return {
                ...state,
                countries: continentFiltered
            }
        case FILTER_BY_ACTIVITY:
            const totalCountries = state.countries;
            const activityFilter = payload === "All" ? totalCountries : totalCountries.filter((e) => e.activities && e.activities.map((c) => c.name).includes(payload));
            return{
                ...state,
                countries: activityFilter
            }

        default:
            return state;
    }
};