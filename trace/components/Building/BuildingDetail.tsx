import React from "react";
import styled from "@emotion/styled";
import { Container } from "styles/commonStyle";
import faker from "faker";
import Rating from "components/common/Rating";
import Link from "next/link";
import { Button } from "antd";
import BuildingDetailSkeleton from "./BuildingDetailSkeleton";

export const Box = styled.div`
    background-color: ${(props) => props.theme.white};
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    padding: 8px;
    flex-direction: column;
`;

const LinkToBuilding = styled.div`
    width: fit-content;
`;

const BuildingSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
`;

const BuildingImg = styled.div`
    margin: 0 3px;
    img {
        border-radius: 8px;
    }
`;

const BuildingInfo = styled.div`
    display: flex;
    padding: 12px;
    flex-direction: column;

    & > div {
        padding-bottom: 12px;
        margin: 8px 0;
    }
    & > div > span:nth-of-type(1) {
        margin-right: 8px;
        width: 50px;
        background-color: ${(props) => props.theme.mainColor};
        border-radius: 12px;
        padding: 6px 12px;
        color: ${(props) => props.theme.white};
    }

    & > div:nth-of-type(4) {
        margin: 0 auto;
    }
`;

const RoomListSection = styled.div`
    padding: 12px 0;
    display: flex;
    flex-direction: column;
`;

const RoomListCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    max-width: 850px;
    width: 100%;
    margin: 12px auto;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        width: 15%;
        height: 2px;
        right: 0;
        bottom: 0;
        background-color: ${(props) => props.theme.black};
    }
`;

const RoomReview = styled.div`
    cursor: pointer;
    padding: 8px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    p {
        margin: 0;
    }

    div:nth-of-type(1) {
        font-weight: 600;
        padding-bottom: 4px;
        font-size: ${(props) => props.theme.ls};
        span {
            font-weight: 400;
            font-size: ${(props) => props.theme.ss};
        }
    }

    div:last-child {
        padding-top: 8px;
    }
`;

interface Props {
    loading: boolean;
}

const BuildingDetail = ({ loading }: Props) => {
    return (
        <Container>
            {loading ? (
                <BuildingDetailSkeleton />
            ) : (
                <Box>
                    <Link href="/building">
                        <LinkToBuilding>
                            <Button type="link">건물 목록 다시 보기</Button>
                        </LinkToBuilding>
                    </Link>
                    <BuildingSection>
                        <BuildingImg>
                            <img src={faker.image.abstract(300, 300)} />
                        </BuildingImg>
                        <BuildingInfo>
                            <div>
                                <span>상세주소</span>
                                <span>경기도성남시분당구</span>
                            </div>
                            <div>
                                <span>건물이름</span>
                                <span>트레이서 빌딩</span>
                            </div>
                            <div>
                                <span>준공년도</span>
                                <span>2012년</span>
                            </div>
                            <div>
                                <Rating score={3} />
                            </div>
                        </BuildingInfo>
                    </BuildingSection>
                    <RoomListSection>
                        <RoomListCard>
                            <div>
                                <img src={faker.image.abstract(180, 180)} />
                            </div>
                            <Link href="/building/review/123">
                                <RoomReview>
                                    <div>
                                        1000/45/3 <span>월세</span>
                                    </div>
                                    <div>
                                        <strong>한줄평 :</strong>
                                        <p>
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit.
                                            Necessitatibus sed vero officia.
                                            Nisi ad, cumque voluptates neque,
                                            sunt, nulla delectus alias totam
                                            aspernatur libero possimus veniam
                                            cupiditate labore natus tempore?
                                        </p>
                                    </div>
                                    <div>
                                        <Rating score={4} />
                                    </div>
                                    <div>
                                        <Button type="primary">
                                            자세히 보기
                                        </Button>
                                    </div>
                                </RoomReview>
                            </Link>
                        </RoomListCard>
                    </RoomListSection>
                </Box>
            )}
        </Container>
    );
};

export default BuildingDetail;
