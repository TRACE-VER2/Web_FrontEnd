import { createSlice } from "@reduxjs/toolkit";
import { BuildingType } from "../@types/interface";

interface initialType {
    isLoading: boolean;
    err: any;
    isSuccess: boolean;
    isFail: boolean;
    mainContent: BuildingType[] | null;
    homeContent: BuildingType[] | null;
    curLocation: string;
    totalPages: number;
}

export const initialState: initialType = {
    isLoading: false,
    err: null,
    isSuccess: false,
    isFail: false,
    mainContent: null,
    homeContent: null,
    curLocation: "",
    totalPages: 0,
};

const building = createSlice({
    initialState: initialState,
    name: "building",
    reducers: {
        // 메인 페이지에 보여줄 빌딩 정보 요청
        buildingInfoReq: (state) => {
            state.isLoading = true;
        },

        buildingInfoSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.homeContent = payload;
        },

        buildingInfoFail: (state) => {
            state.isLoading = false;
            state.isFail = true;
        },

        // 지역별로 건물 정보 요청
        buildingInfoReqByLocation: (state, { payload }) => {
            state.isLoading = true;
            state.curLocation = payload.locationTarget;
        },
        buildingInfoByLocationSuccess: (state, { payload }) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.mainContent = payload.buildingInfo;
            state.totalPages = payload.totalPages;
        },

        buildingInfoByLocationFail: (state) => {
            state.isLoading = false;
            state.isFail = true;
        },

        resetBuildingState: (state) => {
            state.mainContent = null;
        },
    },
});

export const {
    buildingInfoReq,
    buildingInfoSuccess,
    buildingInfoFail,
    buildingInfoReqByLocation,
    buildingInfoByLocationSuccess,
    buildingInfoByLocationFail,
    resetBuildingState,
} = building.actions;

export default building.reducer;
