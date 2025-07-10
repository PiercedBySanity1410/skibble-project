import type { SVGProps } from "react";
interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Mic = ({
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
      d="M7.75 9.6875C9.13125 9.6875 10.25 8.56875 10.25 7.1875V3.75C10.25 2.36875 9.13125 1.25 7.75 1.25C6.36875 1.25 5.25 2.36875 5.25 3.75V7.1875C5.25 8.56875 6.36875 9.6875 7.75 9.6875Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.96875 6.03125V7.09375C2.96875 9.73125 5.1125 11.875 7.75 11.875C10.3875 11.875 12.5313 9.73125 12.5313 7.09375V6.03125"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.75 11.875V13.75"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Mic;
