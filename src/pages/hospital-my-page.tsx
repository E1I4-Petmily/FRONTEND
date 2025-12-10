import { useNavigate } from "react-router-dom";

export default function HospitalMypage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full flex justify-center mt-10 mb-3">
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
          }}
          className="text-red-500 text-sm font-medium"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
