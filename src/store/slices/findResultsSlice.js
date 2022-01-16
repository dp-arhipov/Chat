import {createSlice} from "@reduxjs/toolkit";

const findResultsInitialState = {
    isFetching: false,
    status:"FETCHING",
    data: []
}

const findResultsSlice = createSlice({
    name: "findResults",
    initialState: findResultsInitialState,
    reducers: {
        setFindResultsData(state, action) {
            state.data = action.payload
        },
        setFindResultsStatus(state, action) {
            state.status = action.payload
        },
        resetFindResults(state, action) {
            Object.assign(state, findResultsInitialState)
        }
    }
})



export const findResultsReducer = findResultsSlice.reducer;


export const {setFindResultsStatus, setFindResultsFetching, setFindResultsData, resetFindResults} = findResultsSlice.actions


