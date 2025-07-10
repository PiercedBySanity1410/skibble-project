import type { SVGProps } from "react";
interface LogoutProps extends SVGProps<SVGSVGElement> {
  size: number;
  color: string;
}
const DocumentFill = ({ size, color, ...props }: LogoutProps) => (
  <svg
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M16.125 8.1425H13.9575C12.18 8.1425 10.7325 6.695 10.7325 4.9175V2.75C10.7325 2.3375 10.395 2 9.9825 2H6.8025C4.4925 2 2.625 3.5 2.625 6.1775V12.8225C2.625 15.5 4.4925 17 6.8025 17H12.6975C15.0075 17 16.875 15.5 16.875 12.8225V8.8925C16.875 8.48 16.5375 8.1425 16.125 8.1425Z"
      fill={color}
    />
    <path
      d="M12.6 2.15749C12.2925 1.84999 11.76 2.05999 11.76 2.48749V5.10499C11.76 6.19999 12.69 7.10749 13.8225 7.10749C14.535 7.115 15.525 7.11499 16.3725 7.11499C16.8 7.11499 17.025 6.61249 16.725 6.31249C15.645 5.22499 13.71 3.26749 12.6 2.15749Z"
      fill={color}
    />
  </svg>
);
export default DocumentFill;
