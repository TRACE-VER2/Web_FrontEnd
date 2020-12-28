import React from "react";
import styled from "@emotion/styled";
import { SubTitle } from "./WriteForm";
import Rating from "../common/Rating";
import { ReviewWrite } from "../../@types/interface";
import Select, { ActionMeta } from "react-select";

const Rent = styled.input`
    margin: 0 3px;
    &[type="radio"] {
        cursor: pointer;
    }
`;

const Cost = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin: 20px auto;
`;

const Preview = styled.div`
    width: 100%;
    text-align: right;
    font-size: ${(props) => props.theme.ss};
    color: ${(props) => props.theme.mainColor};
`;

const CostBox = styled.div`
    margin: 8px 6px;
    border: 1px solid ${(props) => props.theme.darkWhite};
    display: flex;
    justify-content: space-between;
    width: 100%;
    label {
        padding: 6px 12px;
        background: #1da1f2;
        flex: 1;
        color: ${(props) => props.theme.white};
    }
    input {
        all: unset;
        text-align: center;
        padding: 6px;
        color: ${(props) => props.theme.black};
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
    span {
        padding-right: 3px;
        font-size: ${(props) => props.theme.ss};
        line-height: 33px;
        color: ${(props) => props.theme.gray};
    }
`;

const TotalRating = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
        font-size: ${(props) => props.theme.ss};
        margin-bottom: 6px;
        color: ${(props) => props.theme.gray};
    }
`;

const SelectSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 300px);
    gap: 8px;
    justify-content: space-around;

    div {
        width: 100%;
    }

    input[type="radio"] {
        cursor: pointer;
        visibility: hidden;
        z-index: 55;
    }

    label {
        border: 1px solid ${(props) => props.theme.darkWhite};
        cursor: pointer;
        padding: 6px 12px;
        color: ${(props) => props.theme.gray};
    }

    input[type="radio"]:checked + label {
        background-color: #1da1f2;
        border: 1px solid ${(props) => props.theme.darkWhite};
        color: ${(props) => props.theme.white};
    }
`;

const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Options = styled.div`
    width: 200px;
    text-align: center;
    margin: 0 auto;
`;

/////////////////////////// 타입 인터페이스 /////////////////////////////////////////////
interface Props {
    handleFormChange: (e: React.FormEvent<HTMLFormElement>) => void;
    writeState: ReviewWrite;
    // 별점 핸들링
    handleFix: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
    handleSelectForm: (value: any, action: ActionMeta<any>) => void;
}

// Select option interface
interface OptionType {
    value: string;
    label: string;
}

const Soundoptions: OptionType[] = [
    { value: "QUIET", label: "독서실" },
    { value: "NOISY", label: "옆사람과 동거중" },
    { value: "OFTEN", label: "종종 들림" },
];

const Bugoptions: OptionType[] = [
    { value: "SOMETIMES", label: "가끔 나와요" },
    { value: "NOTATALL", label: "전혀 안나와요" },
    { value: "QUIETALOT", label: "꽤 안나와요" },
    { value: "ALWAYS", label: "항상 같이 살아요" },
];

export const SelectComponent = ({
    handleFormChange,
    writeState,
    handleFix,
    handleSelectForm,
}: Props) => {
    const {
        rentType,
        deposit,
        monthlyRent,
        noise,
        bug,
        lighting,
        score,
        area,
        waterPressure,
        remodeled,
        frozen,
    } = writeState;

    return (
        <form onChange={handleFormChange}>
            <SubTitle>거주비용</SubTitle>
            <Rent
                type="radio"
                name="rentType"
                id="month"
                value="MONTHLY"
                defaultChecked={rentType === "MONTHLY"}
                required
            />
            <label htmlFor="month">월세</label>
            <Rent
                type="radio"
                name="rentType"
                id="lease"
                value="KEY_MONEY"
                defaultChecked={rentType === "KEY_MONEY"}
            />
            <label htmlFor="charter">전세</label>
            <Cost>
                <CostBox>
                    <label htmlFor="deposit">
                        {rentType === "KEY_MONEY" ? "전세" : "보증금"}
                    </label>
                    <input
                        type="number"
                        id="deposit"
                        name="deposit"
                        defaultValue={deposit}
                        required
                        autoComplete="off"
                    />
                    <span>만원</span>
                </CostBox>
                <Preview>₩{(deposit * 10000).toLocaleString()}</Preview>

                {rentType === "MONTHLY" && (
                    <>
                        <CostBox>
                            <label htmlFor="rent">월세</label>
                            <input
                                type="number"
                                id="rent"
                                name="monthlyRent"
                                defaultValue={monthlyRent}
                                required
                                autoComplete="off"
                            />
                            <span>만원</span>
                        </CostBox>
                        <Preview>
                            ₩{(monthlyRent * 10000).toLocaleString()}
                        </Preview>
                    </>
                )}
                <CostBox>
                    <label htmlFor="area">평수</label>
                    <input
                        type="number"
                        id="area"
                        name="area"
                        defaultValue={area}
                        required
                        autoComplete="off"
                    />
                    <span>㎡　</span>
                </CostBox>
                <Preview>{area}㎡</Preview>
            </Cost>

            <TotalRating>
                <Rating score={score} handleFix={handleFix} />
                <div>별을 클릭해 평가해 주세요!</div>
            </TotalRating>

            <SelectSection>
                <div>
                    <SubTitle>리모델링 여부🏠</SubTitle>
                    <input
                        type="radio"
                        name="remodeled"
                        id="remodeling"
                        value="되어있어요"
                        defaultChecked={remodeled}
                    />
                    <label htmlFor="remodeling">되어있어요</label>
                    <input
                        type="radio"
                        name="remodeled"
                        id="noRemodeling"
                        value=""
                        defaultChecked={!remodeled}
                    />
                    <label htmlFor="noRemodeling">되어있지 않아요</label>
                </div>

                <div>
                    <SubTitle>수압🌊</SubTitle>
                    <input
                        type="radio"
                        name="waterPressure"
                        id="high"
                        value="GOOD"
                        defaultChecked={waterPressure === "GOOD"}
                    />
                    <label htmlFor="high">좋아요</label>
                    <input
                        type="radio"
                        name="waterPressure"
                        id="low"
                        value="BAD"
                        defaultChecked={waterPressure === "BAD"}
                    />
                    <label htmlFor="low">아쉬워요</label>
                </div>

                <div>
                    <SubTitle>동파 경험🥶</SubTitle>
                    <input
                        type="radio"
                        name="frozen"
                        id="nofrozen"
                        value="GOOD"
                        defaultChecked={frozen === "GOOD"}
                    />
                    <label htmlFor="nofrozen">없어요</label>
                    <input
                        type="radio"
                        name="frozen"
                        id="frozen"
                        value="BAD"
                        defaultChecked={frozen === "BAD"}
                    />
                    <label htmlFor="frozen">있어요</label>
                </div>

                <div>
                    <SubTitle>채광🌞</SubTitle>
                    <input
                        type="radio"
                        name="lighting"
                        id="good"
                        value="GOOD"
                        defaultChecked={lighting === "GOOD"}
                    />
                    <label htmlFor="good">좋아요</label>
                    <input
                        type="radio"
                        name="lighting"
                        id="bad"
                        value="BAD"
                        defaultChecked={lighting === "BAD"}
                    />
                    <label htmlFor="bad">아쉬워요</label>
                </div>
            </SelectSection>
            <OptionsGrid>
                <Options>
                    <SubTitle>방음🗣️</SubTitle>
                    <Select
                        options={Soundoptions}
                        onChange={handleSelectForm}
                        name="noise"
                        defaultValue={{
                            value: noise,
                            label: Soundoptions.filter(
                                (arr) => arr.value === noise
                            )[0]?.label,
                        }}
                    />
                </Options>
                <Options>
                    <SubTitle>벌레여부🐛</SubTitle>
                    <Select
                        options={Bugoptions}
                        onChange={handleSelectForm}
                        name="bug"
                        defaultValue={{
                            value: bug,
                            label: Bugoptions.filter(
                                (arr) => arr.value === bug
                            )[0]?.label,
                        }}
                    />
                </Options>
            </OptionsGrid>
        </form>
    );
};
