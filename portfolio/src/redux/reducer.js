import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOG, CREATE_DOG, GET_DOG_BY_NAME, GET_TEMPERAMENT} from "./actions";

const initialState = {
    allDogs: [],
    allTemperaments: [],
    dog: [],
    created: [],
    dogs: [],
    allDogsCopy: [],
    temperament: []
}

export default function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                allDogsCopy: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperament: action.payload
            }
        case GET_DOG:
            return {
                ...state,
                dog: action.payload
            }
        case CREATE_DOG:
            return {
                ...state
            }
        case "CLEAR_DETAILS":
            return{
                ...state,
                dog: []
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                allDogs: action.payload
            }
        case "FILTER_BY_TEMP": 
            const allDogs = state.allDogs
            const temperamentFilter = action.payload === "all" ? allDogs : allDogs.filter((e) => {
                if (typeof (e.temperaments) === "string") return e.temperaments.includes(action.payload)
                if (Array.isArray(e.temperaments)) {
                    let temp = e.temperaments.map(e => e.name)
                    return temp.includes(action.payload)
                }
                return true
            })
            return {
                ...state,
                allDogs: temperamentFilter
            }
        case "ORDER_BY_NAME":
            let sort = action.payload === "asc" ? state.allDogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }) : state.allDogs.sort (function (a, b) {
                if (a.name > b.name) {
                    return -1
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                allDogs: sort
            }  
        case "CREATED_FILTER":
            const allDogsCopy = state.allDogsCopy
            const createdFilter = action.payload === "created" ? allDogsCopy.filter((a) => a.createdInDb) : allDogsCopy.filter(a => !a.createdInDb)
            return {
                ...state,
                allDogs: action.payload === "All" ? state.allDogsCopy : createdFilter
            }
        case "ORDER_BY_WEIGHT":
            const filterWeight = action.payload === "asc" ?  
            state.allDogs.sort(function (a, b) {
                return parseInt(a.weightMin) - parseInt(b.weightMin)
            }) :
            state.allDogs.sort(function (a, b) {
                return parseInt(b.weightMax) - parseInt(a.weightMax)
            })
            return {
                ...state,
                allDogs: filterWeight
            }
        default:
            return state
    }
}