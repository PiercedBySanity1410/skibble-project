import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const ArrowDown = ({ size, color, ...props }: LogoutProps) => (
  <svg
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M10.4598 4.47485L7.1998 7.73485C6.8148 8.11985 6.1848 8.11985 5.7998 7.73485L2.53979 4.47485"
      stroke={color}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowDown;
