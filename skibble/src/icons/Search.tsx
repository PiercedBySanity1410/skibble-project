import type { SVGProps } from "react";

interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const Search = ({
  size,
  color,
  ...props
}: LogoutProps) => (
  <svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M10.0834 18C14.4557 18 18.0001 14.4555 18.0001 10.0833C18.0001 5.71104 14.4557 2.16663 10.0834 2.16663C5.71116 2.16663 2.16675 5.71104 2.16675 10.0833C2.16675 14.4555 5.71116 18 10.0834 18Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8334 18.8333L17.1667 17.1666"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Search;
