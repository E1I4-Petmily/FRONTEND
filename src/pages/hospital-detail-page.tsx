import { useEffect, useState } from "react";
import {
  getHospitalDetail,
  type HospitalDetail,
} from "../apis/hospital-detail";
import Button from "../components/common/Button";
import pin from "../assets/hospital-icons/pin.svg";
import time from "../assets/hospital-icons/time.svg";
import call from "../assets/hospital-icons/call.svg";
import websiteIcon from "../assets/hospital-icons/website.svg";
import tag from "../assets/hospital-icons/tag.svg";
import star from "../assets/hospital-icons/star.svg";
import hospitalImage from "../assets/hospital-demo-image.png";

import AiSummary from "../components/hospital/AiSummary";
import ReviewCard from "../components/hospital/ReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function HospitalDetailPage() {
  const setHeaderTitle = useOutletContext<(title: string) => void>();
  const [data, setData] = useState<HospitalDetail | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { placeId } = useParams() as { placeId: string };

  useEffect(() => {
    if (!placeId) return;
    setLoading(true);

    async function fetchDetail() {
      const result = await getHospitalDetail(placeId);
      setData(result);
      setLoading(false);
    }

    fetchDetail();
  }, [placeId]);

  useEffect(() => {
    if (data && typeof data.name === "string") {
      setHeaderTitle(data.name);
    }
  }, [data, setHeaderTitle]);

  if (loading || !data)
    return <p className="p-5 text-center">불러오는 중...</p>;

  return (
    <div className="w-full max-w-[480px] mx-auto bg-[#F8F8F8] min-h-screen font-[PretendardVariable] pb-24">
      {/* 병원 기본 이미지 */}
      <img
        src={data.mainPhotoUrl ?? hospitalImage}
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
      <div className="px-6 py-6 bg-white mt-2 mb-8">
        <p className="text-lg font-semibold mb-3">리뷰</p>

        <div className="flex flex-col gap-3">
          {data.reviews.map((r, index) => (
            <ReviewCard key={index} review={r} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-20 py-2 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white px-3 z-50">
        <Button
          onClick={() => {
            if (!data.registered) return;
            navigate("/hospital/reservation", {
              state: {
                hospitalProfileId: data.hospitalAccountId,
              },
            });
          }}
          bgColor="#F56E6D"
          activeColor="#c54f4f"
          disabled={!data.registered}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}
