import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Forward = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5245 3.60805C10.6733 3.7549 10.6733 3.9951 10.5245 4.14195L7.25238 7.37018C7.01543 7.60397 6.61401 7.43611 6.61401 7.10324V6.20278C6.61401 6.0473 6.51836 5.90686 6.37098 5.85734C4.31693 5.16716 2.5306 5.7707 1.10327 7.09338C0.834435 7.3425 0.380929 7.14459 0.457852 6.78624C1.12489 3.67881 3.51468 2.09643 6.25433 1.86766C6.45488 1.85091 6.61401 1.68648 6.61401 1.48523V0.646763C6.61401 0.313892 7.01543 0.146033 7.25238 0.379815L10.5245 3.60805Z"
      fill={color}
    />
  </svg>
);
export default Forward;
