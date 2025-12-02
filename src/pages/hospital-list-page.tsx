import { useEffect, useState } from "react";
import HospitalCard from "../components/hospital/HospitalCard";
import { getHospitals, type Hospital } from "../apis/hospital-list";
import search from "../assets/search.svg";

export default function HospitalListPage() {
  const [query, setQuery] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);

  // 목데이터
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      const data = await getHospitals("");
      setHospitals(data);
      setLoading(false);
    };

    fetchInitial();
  }, []);

  //검색 버튼, 엔터 눌렀을 때
  const handleSearch = async () => {
    setLoading(true);
    const data = await getHospitals(query);
    setHospitals(data);
    setLoading(false);
  };

  return (
    <div className=" bg-[#F8F8F8] mt-[-40px] font-[PretendardVariable]">
      {/* 검색창 */}
      <div className="flex items-center gap-2 px-5">
        <input
          className="w-full h-[35px] rounded-[15px] border border-[#4c4c4c] px-3 text-xs text-[#1f1f1f]"
          placeholder="검색어를 입력해주세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center w-[35px] h-[35px] rounded-[15px] bg-[#f56e6d]"
        >
          <img src={search} alt="별점" className="w-4 h-4" />
        </button>
      </div>

      {/* 리스트*/}
      {loading && (
        <p className="mt-4 text-sm text-center text-gray-500">불러오는 중...</p>
      )}

      {!loading && hospitals.length === 0 && (
        <p className="mt-4 text-sm text-center text-gray-500">
          검색 결과가 없습니다.
        </p>
      )}

      <div className="mt-2">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.placeId} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}
