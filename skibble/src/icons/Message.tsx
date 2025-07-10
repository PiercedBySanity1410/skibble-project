import type { SVGProps } from "react";
interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Message = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
      <path
        d="M12.5 2H6.5C3.5 2 2 3.5 2 6.5V16.25C2 16.6625 2.3375 17 2.75 17H12.5C15.5 17 17 15.5 17 12.5V6.5C17 3.5 15.5 2 12.5 2Z"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 7.625H13.25"
        stroke={color}
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 11.375H11"
        stroke={color}
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
export default Message;
