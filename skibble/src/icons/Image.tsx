import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Image = ({
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
      d="M7.5 16.5H12C15.75 16.5 17.25 15 17.25 11.25V6.75C17.25 3 15.75 1.5 12 1.5H7.5C3.75 1.5 2.25 3 2.25 6.75V11.25C2.25 15 3.75 16.5 7.5 16.5Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 7.5C8.32843 7.5 9 6.82843 9 6C9 5.17157 8.32843 4.5 7.5 4.5C6.67157 4.5 6 5.17157 6 6C6 6.82843 6.67157 7.5 7.5 7.5Z"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.75256 14.2125L6.45006 11.73C7.04256 11.3325 7.89756 11.3775 8.43006 11.835L8.67756 12.0525C9.26256 12.555 10.2076 12.555 10.7926 12.0525L13.9126 9.37504C14.4976 8.87254 15.4426 8.87254 16.0276 9.37504L17.2501 10.425"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Image;
