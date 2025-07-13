import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const DocumentView = ({ size, color, ...props }: LogoutProps) => (
  <svg
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M2.25 7.25V5.375C2.25 3.5075 3.7575 2 5.625 2H7.5"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2H13.875C15.7425 2 17.25 3.5075 17.25 5.375V7.25"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.25 12.5V13.625C17.25 15.4925 15.7425 17 13.875 17H12.75"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 17H5.625C3.7575 17 2.25 15.4925 2.25 13.625V11.75"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.625 5.75V7.25C8.625 8 8.25 8.375 7.5 8.375H6C5.25 8.375 4.875 8 4.875 7.25V5.75C4.875 5 5.25 4.625 6 4.625H7.5C8.25 4.625 8.625 5 8.625 5.75Z"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.625 5.75V7.25C14.625 8 14.25 8.375 13.5 8.375H12C11.25 8.375 10.875 8 10.875 7.25V5.75C10.875 5 11.25 4.625 12 4.625H13.5C14.25 4.625 14.625 5 14.625 5.75Z"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.625 11.75V13.25C8.625 14 8.25 14.375 7.5 14.375H6C5.25 14.375 4.875 14 4.875 13.25V11.75C4.875 11 5.25 10.625 6 10.625H7.5C8.25 10.625 8.625 11 8.625 11.75Z"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.625 11.75V13.25C14.625 14 14.25 14.375 13.5 14.375H12C11.25 14.375 10.875 14 10.875 13.25V11.75C10.875 11 11.25 10.625 12 10.625H13.5C14.25 10.625 14.625 11 14.625 11.75Z"
      stroke={color}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DocumentView;
