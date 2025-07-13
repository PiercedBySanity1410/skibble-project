import type { SVGProps } from "react";
interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Close = ({ size, color, ...props }: LogoutProps) => (
  <svg
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M3.00073 3L10.0003 9.99953"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.0001 9.99953L9.99963 3"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Close;
