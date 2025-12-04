interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
}

const CalendarIcon: React.FC<IconProps> = ({
  width = 28,
  height = 28,
  color = "white",
  opacity = 1,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <path d="M10.9777 11.3246H8.50708V13.6612H10.9777V11.3246Z" fill={color} />
    <path d="M15.2352 11.3246H12.7646V13.6612H15.2352V11.3246Z" fill={color} />
    <path d="M19.4929 11.3246H17.0223V13.6612H19.4929V11.3246Z" fill={color} />
    <path d="M23.7423 11.3246H21.2717V13.6612H23.7423V11.3246Z" fill={color} />
    <path d="M6.72816 16.1613H4.25757V18.4979H6.72816V16.1613Z" fill={color} />
    <path d="M10.9777 16.1613H8.50708V18.4979H10.9777V16.1613Z" fill={color} />
    <path d="M15.2352 16.1613H12.7646V18.4979H15.2352V16.1613Z" fill={color} />
    <path d="M19.4929 16.1613H17.0223V18.4979H19.4929V16.1613Z" fill={color} />
    <path d="M23.7423 16.1613H21.2717V18.4979H23.7423V16.1613Z" fill={color} />
    <path d="M6.72816 21.0059H4.25757V23.3424H6.72816V21.0059Z" fill={color} />
    <path d="M10.9777 21.0059H8.50708V23.3424H10.9777V21.0059Z" fill={color} />
    <path d="M15.2352 21.0059H12.7646V23.3424H15.2352V21.0059Z" fill={color} />
    <path d="M19.4929 21.0059H17.0223V23.3424H19.4929V21.0059Z" fill={color} />
    <path
      d="M23.4706 1.51878H22.9188V0H22.0953V1.51878H5.90471V0H5.08118V1.51878H4.52941C2.03412 1.51878 0 3.44256 0 5.8025V23.7163C0 26.0762 2.03412 28 4.52941 28H23.4706C25.9659 28 28 26.0762 28 23.7163V5.8025C28 3.44256 25.9659 1.51878 23.4706 1.51878ZM27.1765 23.7163C27.1765 25.6478 25.5129 27.2211 23.4706 27.2211H4.52941C2.48706 27.2211 0.823529 25.6478 0.823529 23.7163V7.43811H27.1765V23.7163ZM0.823529 6.65925V5.8025C0.823529 3.87093 2.48706 2.29764 4.52941 2.29764H23.4706C25.5129 2.29764 27.1765 3.87093 27.1765 5.8025V6.65925H0.823529Z"
      fill={color}
    />
  </svg>
);

export default CalendarIcon;
