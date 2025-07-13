import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Video = ({
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
      d="M10.0726 15H4.92741C2.35482 15 1.5 13.5971 1.5 12.1875V6.5625C1.5 4.45145 2.35482 3.75 4.92741 3.75H10.0726C12.6452 3.75 13.5 4.45145 13.5 6.5625V12.1875C13.5 14.2985 12.637 15 10.0726 15Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8783 13.1252L13.5 11.5484V6.44598L15.8783 4.86917C17.0418 4.10097 18 4.56998 18 5.92038V12.0821C18 13.4325 17.0418 13.9015 15.8783 13.1252Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Video;
