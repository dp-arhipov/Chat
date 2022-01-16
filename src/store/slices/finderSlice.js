import {createSlice} from "@reduxjs/toolkit";

const findResultsInitialState = {
    status:"INIT",
    data: []
}

const finderSlice = createSlice({
    name: "findResults",
    initialState: findResultsInitialState,
    reducers: {
        setFinderResults(state, action) {
            state.data = action.payload
        },
        setFinderStatus(state, action) {
            state.status = action.payload
        },
        resetFinder(state, action) {
            Object.assign(state, findResultsInitialState)
        }
    }
})



export const finderReducer = finderSlice.reducer;


export const {setFinderStatus, setFinderResults, resetFinder} = finderSlice.actions


