import axios from "axios"

export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS"
export const GET_DOG = "GET_DOG"
export const CREATE_DOG = "CREATE_DOG"
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME"
// export const DELETE_DOG = "DELETE_DOG"

export function getAllDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://api-dogs-cieri.herokuapp.com/dogs")
            return dispatch({
                type: "GET_ALL_DOGS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getAllTemperaments () {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://api-dogs-cieri.herokuapp.com/temperaments")
            return dispatch({
                type: "GET_ALL_TEMPERAMENTS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDog (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`https://api-dogs-cieri.herokuapp.com/dog/${id}`)
            return dispatch({
                type: "GET_DOG",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export function deleteDog (id){
//     return async function (dispatch) {
//         try {
//             var json = await axios.delete(`http://localhost:3001/dog/${id}`)
//             return dispatch({
//                 type: "DELETE_DOG",
//                 payload: json.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export function createDog (payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post(`https://api-dogs-cieri.herokuapp.com/dogs`,payload)
            return dispatch({
                type: "CREATE_DOG",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearDetails() {
    return {
        type: "CLEAR_DETAILS",
    }
}

export function getDogByName (name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`https://api-dogs-cieri.herokuapp.com/dogs?name=${name}`)
            return dispatch({
                type: "GET_DOG_BY_NAME",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByTemp (payload) {
    return {
        type: "FILTER_BY_TEMP",
        payload: payload
    }
}

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export const createdFilter = (payload) => {
    return {
        type: "CREATED_FILTER",
        payload
    }
}

export const orderByWeight = (payload) => {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}