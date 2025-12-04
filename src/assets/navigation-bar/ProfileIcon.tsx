interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
}

const ProfileIcon: React.FC<IconProps> = ({
  width = 30,
  height = 29,
  color = "white",
  opacity = 1,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 30 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <path
      d="M14.9998 0.5C18.721 0.5 21.7556 3.58209 21.7556 7.40527C21.7554 11.2283 18.7209 14.3096 14.9998 14.3096C11.2788 14.3094 8.24504 11.2282 8.24487 7.40527C8.24487 3.5822 11.2787 0.500171 14.9998 0.5Z"
      stroke={color}
    />
    <path
      d="M29 28C26.3262 22.9042 21.0597 19.438 15 19.438C8.9403 19.438 3.67381 22.9042 1 28"
      stroke={color}
      strokeLinecap="round"
    />
  </svg>
);

export default ProfileIcon;
