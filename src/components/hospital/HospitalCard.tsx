import type { Hospital } from "../../apis/hospital-list";
import starIcon from "../../assets/star.svg";

interface HospitalCardProps {
  hospital: Hospital;
}

function HospitalCard({ hospital }: HospitalCardProps) {
  const { name, address, rating, userRatingsTotal, registered, treatTargets } =
    hospital;

  return (
    <div className="px-6 py-5 border-b border-[#D1D1D1] bg-[#F8F8F8]">
      {/* 병원 이름 */}
      <p className="text-base font-semibold text-[#1f1f1f]">{name}</p>

      {/* 별점,리뷰 개수 */}
      <div className="flex items-center gap-1 mt-1">
        <img src={starIcon} alt="별점" className="w-5 h-5 ml-[-4px]" />
        <p className="text-sm font-semibold text-[#1f1f1f]">
          {rating !== null ? rating.toFixed(1) : "-"}
        </p>
        <p className="text-sm text-[#1f1f1f]">
          (
          {userRatingsTotal !== null && userRatingsTotal > 0
            ? `${userRatingsTotal}+`
            : "0"}
          )
        </p>
      </div>

      {/* 주소 */}
      <p className="mt-2 text-sm text-[#656565]">{address}</p>

      {/*진료 대상 태그 (가입 병원만) */}
      {registered && treatTargets && treatTargets.length > 0 && (
        <div className="flex gap-2 mt-2">
          {treatTargets.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-sm text-[#f56e6d] border border-[#f56e6d] rounded-[20px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default HospitalCard;
