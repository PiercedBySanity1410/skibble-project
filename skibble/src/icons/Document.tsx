import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Document = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M17.25 7.5V11.25C17.25 15 15.75 16.5 12 16.5H7.5C3.75 16.5 2.25 15 2.25 11.25V6.75C2.25 3 3.75 1.5 7.5 1.5H11.25"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.25 7.5H14.25C12 7.5 11.25 6.75 11.25 4.5V1.5L17.25 7.5Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 9.75H10.5"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12.75H9"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Document;
