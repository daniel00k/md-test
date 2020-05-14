import { ADD_FILTER, REMOVE_FILTER } from "./actionTypes";

export function addFilter(breeding) {
    return {
        type: ADD_FILTER,
        breeding
    }
}

export function removeFilter(breeding) {
    return {
        type: REMOVE_FILTER,
        breeding
    }
}