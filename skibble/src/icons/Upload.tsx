import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Upload = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M5.58606 11.5V7L4.08606 8.5"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.58606 7L7.08606 8.5"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3361 6.25V10C15.3361 13.75 13.8361 15.25 10.0861 15.25H5.58606C1.83606 15.25 0.33606 13.75 0.33606 10V5.5C0.33606 1.75 1.83606 0.25 5.58606 0.25H9.33606"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3361 6.25H12.3361C10.0861 6.25 9.33606 5.5 9.33606 3.25V0.25L15.3361 6.25Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Upload;
