import { useEffect, useState } from "react";
/* import { useParams } from "react-router-dom"; */
import {
  /* getHospitalDetail, */
  type HospitalDetail,
} from "../apis/hospital-detail";
import Button from "../components/common/Button";
import pin from "../assets/hospital-icons/pin.svg";
import time from "../assets/hospital-icons/time.svg";
import call from "../assets/hospital-icons/call.svg";
import websiteIcon from "../assets/hospital-icons/website.svg";
import tag from "../assets/hospital-icons/tag.svg";
import star from "../assets/hospital-icons/star.svg";

import AiSummary from "../components/hospital/AiSummary";
import ReviewCard from "../components/hospital/ReviewCard";

const MOCK_DETAIL: HospitalDetail = {
  name: "비엔동물전문의료센터",
  website: "http://www.petmily.co.kr",
  rating: 4.5,
  types: ["veterinary_care"],
  reviews: [
    { rating: 5, text: "친절하고 자세하게 설명해주셨어요!" },
    {
      rating: 4,
      text: "계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 그러나, 겨울이 지나고 나의 어머님, 그리고 당신은 멀리 북간도에 계십니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 ",
    },
  ],
  registered: true,
  hospitalAccountId: 1,
  animalTypes: ["강아지", "고양이", "햄스터"],
  summary: {
    keywords: [
      { term: "친절", sentiment: "POSITIVE", count: 3, ratio: 0.6 },
      { term: "비용", sentiment: "NEGATIVE", count: 1, ratio: 0.2 },
    ],
    negativeCount: 1,
    positiveCount: 3,
    totalCount: 4,
    overallSummary:
      "친절하고 꼼꼼한 병원이지만 비용 관련 의견도 일부 있습니다. 전반적으로 긍정적인 평가가 많습니다. 그리고 예약 시스템이 잘 갖춰져 있어 편리합니다.",
  },
  place_id: "MOCK_PLACE_ID",
  formatted_address: "경기도 부천시 소사구 경인로 475",
  formatted_phone_number: "010-1234-5678",
  user_ratings_total: 20,
  opening_hours: {
    open_now: true,
  },
};

export default function HospitalDetailPage() {
  const [data, setData] = useState<HospitalDetail | null>(null);

  useEffect(() => {
    setData(MOCK_DETAIL);
  }, []);

  if (!data) return <p className="p-5">로딩중...</p>;
  /* const { placeId } = useParams();
  const [loading, setLoading] = useState(false); */

  /* useEffect(() => {
    if (!placeId) return;
    setLoading(true);

    async function fetchDetail() {
      const result = await getHospitalDetail(placeId!);
      setData(result);
      setLoading(false);
    }

    fetchDetail();
  }, [placeId]);

  if (loading || !data) {
    return <p className="p-5 text-center">불러오는 중...</p>;
  } */

  return (
    <div className="w-full max-w-[480px] mx-auto bg-[#F8F8F8] min-h-screen font-[PretendardVariable] pb-24">
      {/* 병원 기본 이미지 */}
      <img
        src="/default-hospital.jpg"
        alt="병원 이미지"
        className="w-full h-[180px] object-cover bg-gray-100"
      />

      {/* 상세 내용 */}
      <div className="flex flex-col gap-3 px-6 py-5 bg-white">
        {/* 병원 이름 */}
        <p className="text-xl font-semibold text-[#1f1f1f]">{data.name}</p>

        {/* 주소 */}
        <div className="flex items-end gap-2">
          <img src={pin} className="w-4 h-4" />
          <p className="text-sm font-medium text-[#2c2c2c]">
            {data.formatted_address}
          </p>
        </div>

        {/* 영업중 여부 */}
        <div className="flex items-start gap-2">
          <img src={time} className="w-4 h-4" />
          <p className="text-sm font-medium text-[#2c2c2c]">
            {data.opening_hours?.open_now ? "영업중" : "영업 종료"}
          </p>
        </div>

        {/* 전화번호 */}
        {data.formatted_phone_number && (
          <div className="flex items-end gap-2">
            <img src={call} className="w-4 h-4" />
            <p className="text-sm font-medium text-[#2c2c2c]">
              {data.formatted_phone_number}
            </p>
          </div>
        )}

        {/* 웹사이트 */}
        {data.website && (
          <div className="flex items-end gap-2">
            <img src={websiteIcon} className="w-4 h-4" />
            <a
              href={data.website}
              target="_blank"
              className="text-sm font-medium text-[#2b5cee] break-all"
            >
              {data.website}
            </a>
          </div>
        )}

        {/* 진료 대상 태그 */}
        {data.registered && data.animalTypes && data.animalTypes.length > 0 && (
          <div className="flex items-start gap-2">
            <img src={tag} className="w-4 h-4" />
            <p className="text-sm font-medium text-[#2c2c2c]">
              {data.animalTypes.join(", ")}
            </p>
          </div>
        )}

        {/* 별점 */}
        <div className="flex items-start gap-2">
          <img src={star} className="w-5 h-5 ml-[-2px]" />
          <p className="text-sm text-[#2c2c2c]">
            <span className="font-medium">{data.rating?.toFixed(1)} </span>
            <span>({data.user_ratings_total})</span>
          </p>
        </div>
      </div>

      {/* AI 요약 */}
      <AiSummary summary={data.summary} />

      {/* 리뷰 리스트 */}
      <div className="px-6 py-6  bg-white mt-2 ">
        <p className="text-lg font-semibold mb-3">리뷰</p>

        <div className="flex flex-col gap-3">
          {data.reviews.map((r, index) => (
            <ReviewCard key={index} review={r} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white px-6 z-50">
        <Button bgColor="#F56E6D" activeColor="#c54f4f">
          예약하기
        </Button>
      </div>
    </div>
  );
}
