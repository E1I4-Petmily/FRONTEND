import { useState } from "react";
import type { Review } from "../../apis/hospital-detail";
import starIcon from "../../assets/hospital-icons/star.svg";
import profileIcon from "../../assets/profile-icons/cat.png";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLongText = review.text.length > 60; //2줄 기준
  const displayText = expanded
    ? review.text
    : review.text.slice(0, 60) + (isLongText ? "..." : "");

  return (
    <div className="flex flex-col w-full px-4 py-3.5 gap-2.5 rounded-2xl bg-[#f8f8f8]">
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <div className="relative w-5 h-5">
              <div className="absolute w-5 h-5 rounded-[5px] bg-[#f7e3c2]" />
              <img
                src={profileIcon}
                className="absolute w-[18px] h-[18px] left-[1px] top-[1px] object-cover rounded"
              />
            </div>

            <p className="text-xs font-semibold text-[#1f1f1f]">
              {review.author_name}
            </p>
            <p className="text-xs text-[#ababab]">{review.date}</p>
          </div>

          {/* 별점 */}
          <div className="flex">
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={starIcon}
                className={`w-5 h-5 ${n <= review.rating ? "" : "opacity-30"}`}
              />
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-[#D1D1D1] rounded-full" />

        {/* 리뷰 내용 */}
        <p className="text-sm font-medium text-justify text-[#2c2c2c] leading-5">
          {displayText}
        </p>

        {/* 더보기 버튼 */}
        {isLongText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-[#4d4d4d] mt-1 text-left font-medium"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </div>
    </div>
  );
}
