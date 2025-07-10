import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Download = ({ size, color, ...props }: LogoutProps) => (
  <svg
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M11.7938 9.0188L8.00005 12.8125L4.2063 9.0188"
      stroke={color}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2.18738V12.7061"
      stroke={color}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.625 14.3749H12.375"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
    />
  </svg>
);
export default Download;
