import { all, fork, takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";
import {
    buildingInfoReq,
    buildingInfoSuccess,
    buildingInfoFail,
    buildingInfoReqByLocation,
    buildingInfoByLocationSuccess,
    buildingInfoByLocationFail,
} from "Redux/building";
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";

// 메인 화면에 보여줄 건물 정보 요청
function mainBuildingInfoApi() {
    return axios.get("/api/v1/buildings");
}

// 지역별 건물 정보 요청
function buildingInfoByLocationApi(location: string) {
    return axios.get(`/api/v1/buildings?location=${location}`);
}

function* mainBuildingInfo() {
    try {
        const res = yield call(mainBuildingInfoApi);
        const value = res.data.data.content;

        if (res.data.success) {
            yield put(buildingInfoSuccess(value));
        } else {
            yield put(buildingInfoFail());
        }
    } catch (e) {
        console.log(e);
        yield put(buildingInfoFail());
    }
}

function* buildingInfoByLocation({ payload }: PayloadAction<string>) {
    try {
        const res = yield call(buildingInfoByLocationApi, payload);
        const value = res.data.data.content;

        if (res.data.success) {
            yield put(buildingInfoByLocationSuccess(value));
        } else {
            yield put(buildingInfoByLocationFail());
        }
    } catch (e) {
        console.log(e);
        yield put(buildingInfoByLocationFail());
    }
}

function* watchMainBuildingInfo() {
    yield takeLatest(buildingInfoReq, mainBuildingInfo);
}

function* watchBuildingInfoByLocation() {
    yield takeLatest(buildingInfoReqByLocation, buildingInfoByLocation);
}

export default function* buildingSaga(): Generator {
    yield all([fork(watchMainBuildingInfo), fork(watchBuildingInfoByLocation)]);
}
