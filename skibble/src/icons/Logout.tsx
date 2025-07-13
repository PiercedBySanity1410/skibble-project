import type { SVGProps } from "react";
interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Logout = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M17.4399 14.62L19.9999 12.06L17.4399 9.5"
      stroke={color}
      strokeWidth={1.25}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.76001 12.06H19.93"
      stroke={color}
      strokeWidth={1.25}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
      stroke={color}
      strokeWidth={1.25}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logout;
