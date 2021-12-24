import {createSlice} from "@reduxjs/toolkit";

const findResultsInitialState = {
    isFetching: false,
    data: []
}

const findResultsSlice = createSlice({
    name: "findResults",
    initialState: findResultsInitialState,
    reducers: {
        setFindResultsFetching(state, action) {
            state.isFetching = action.payload;
        },
        setFindResults(state, action) {
            state.data = action.payload
        },
        resetFindResults(state, action) {
            Object.assign(state, findResultsInitialState)
        }
    }
})



export const findResultsReducer = findResultsSlice.reducer;


export const {setFindResultsFetching, setFindResults, resetFindResults} = findResultsSlice.actions


