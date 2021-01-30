import { createSlice } from "@reduxjs/toolkit";

interface searchStateType {
    isloading: boolean;
    isSuccess: boolean;
    isFail: boolean;
    searchResult: any;
}

const searchState: searchStateType = {
    isloading: false,
    isSuccess: false,
    isFail: false,
    searchResult: null,
};

const Search = createSlice({
    name: "search",
    initialState: searchState,
    reducers: {
        searchReq: (state, { payload }) => {
            state.isloading = true;
        },

        searchSuccess: (state, { payload }) => {
            state.isloading = false;
            state.isSuccess = true;
            state.searchResult = payload;
        },

        searchFail: (state) => {
            state.isloading = false;
            state.isFail = true;
        },
    },
});

export const { searchReq, searchSuccess, searchFail } = Search.actions;

export default Search.reducer;
