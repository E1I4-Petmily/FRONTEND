import Button from "../components/common/Button";

interface RegisterLayoutProps {
  step: number;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  buttonContext: string;
  onNext: () => void;
}

const RegisterLayout = ({
  step,
  title,
  subtitle,
  children,
  buttonContext,
  onNext,
}: RegisterLayoutProps) => {
  const progress = (step / 4) * 100;

  return (
    <div className="flex flex-col min-h-screen mt-[-40px]">
      <div className="px-6 pb-6">
        <div className="w-full bg-[#D1D1D1] h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-[#F56E6D] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8">
          <h1 className="text-[22px] font-[PretendardVariable] font-bold leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[15px] font-[PretendardVariable] font-light text-[#656565] mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex-1 mt-6">{children}</div>

        <div className="absolute bottom-10 left-0 w-full px-[10px]">
          <Button onClick={onNext} bgColor="#F56E6D" activeColor="#c54f4f">
            {buttonContext}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterLayout;
