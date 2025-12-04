import type { Summary } from "../../apis/hospital-detail";
import aiIcon from "../../assets/hospital-icons/ai.svg";

interface Props {
  summary?: Summary;
}

export default function AiSummary({ summary }: Props) {
  if (!summary) return null;

  //키워드 분류
  const positive = summary.keywords.filter((k) => k.sentiment === "POSITIVE");
  const negative = summary.keywords.filter((k) => k.sentiment === "NEGATIVE");
  const neutral = summary.keywords.filter((k) => k.sentiment === "NEUTRAL");

  //그래프 비율계산용
  const positiveCount = positive.length;
  const negativeCount = negative.length;
  const neutralCount = neutral.length;

  const totalCount = positiveCount + negativeCount + neutralCount;

  // 비율
  const positiveRatio = (positiveCount / totalCount) * 100;
  const negativeRatio = (negativeCount / totalCount) * 100;
  const neutralRatio = (neutralCount / totalCount) * 100;

  //도넛형 그래프
  const circumference = 2 * Math.PI * 42;
  const strokeWidth = 35;

  const positiveStroke = (positiveRatio / 100) * circumference;
  const negativeStroke = (negativeRatio / 100) * circumference;
  const neutralStroke = (neutralRatio / 100) * circumference;

  return (
    <section className="bg-white px-6 py-6 mt-2">
      <div className="flex items-center gap-2">
        <img src={aiIcon} className="w-5 h-5" />
        <p className="text-lg font-semibold">AI 요약</p>
      </div>

      <div className="flex justify-between mt-3">
        {/* 그래프 */}
        <div className="w-[130px] h-[130px] relative">
          <svg width="130" height="130">
            {/* 전체 그래프 배경 */}
            <circle
              cx="65"
              cy="65"
              r="42"
              stroke="#E5E5E5"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* 긍정 */}
            <circle
              cx="65"
              cy="65"
              r="42"
              stroke="#FFCE32"
              strokeWidth={strokeWidth}
              strokeDasharray={`${positiveStroke} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="butt"
              fill="none"
            />

            {/* 부정 */}
            <circle
              cx="65"
              cy="65"
              r="42"
              stroke="#4D4D4D"
              strokeWidth={strokeWidth}
              strokeDasharray={`${negativeStroke} ${circumference}`}
              strokeDashoffset={-positiveStroke}
              strokeLinecap="butt"
              fill="none"
            />

            {/* 기타 */}
            <circle
              cx="65"
              cy="65"
              r="42"
              stroke="#A6A6A6"
              strokeWidth={strokeWidth}
              strokeDasharray={`${neutralStroke} ${circumference}`}
              strokeDashoffset={-(positiveStroke + negativeStroke)}
              strokeLinecap="butt"
              fill="none"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-3 px-12">
          {/* 긍정 */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#FFCE32]" />
              <p className="text-sm font-semibold text-[#2c2c2c]">
                긍정 키워드
              </p>
            </div>
            <p className="text-sm text-[#2c2c2c] pl-[23px] mt-1">
              {positive.length > 0
                ? positive.map((k) => k.term).join(", ")
                : "없음"}
            </p>
          </div>

          {/* 부정 */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#4D4D4D]" />
              <p className="text-sm font-semibold text-[#2c2c2c]">
                부정 키워드
              </p>
            </div>
            <p className="text-sm text-[#2c2c2c] pl-[23px] mt-1">
              {negative.length > 0
                ? negative.map((k) => k.term).join(", ")
                : "없음"}
            </p>
          </div>

          {/* 기타 */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#A6A6A6]" />
              <p className="text-sm font-semibold text-[#2c2c2c]">기타</p>
            </div>
            <p className="text-sm text-[#2c2c2c] pl-[23px] mt-1">
              {neutral.length > 0
                ? neutral.map((k) => k.term).join(", ")
                : "없음"}
            </p>
          </div>
        </div>
      </div>
      <p
        className="
    text-sm
    text-[#2c2c2c]
    mt-6 
     leading-5 
    whitespace-pre-line
    break-words
  "
      >
        {summary.overallSummary}
      </p>
    </section>
  );
}
