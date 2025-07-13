import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Send = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M10.7729 0.967835L4.00043 3.21783C-0.552065 4.74033 -0.552065 7.22283 4.00043 8.73783L6.01043 9.40533L6.67793 11.4153C8.19293 15.9678 10.6829 15.9678 12.1979 11.4153L14.4554 4.65033C15.4604 1.61283 13.8104 -0.0446651 10.7729 0.967835ZM11.0129 5.00284L8.16293 7.86784C8.05043 7.98033 7.90793 8.03284 7.76543 8.03284C7.62293 8.03284 7.48043 7.98033 7.36794 7.86784C7.15043 7.65033 7.15043 7.29034 7.36794 7.07283L10.2179 4.20784C10.4354 3.99033 10.7954 3.99033 11.0129 4.20784C11.2304 4.42534 11.2304 4.78534 11.0129 5.00284Z"
      fill={color}
    />
  </svg>
);
export default Send;
