import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Dominican Republic Flag Icon
 * A simplified version with the correct quadrant colors and white cross.
 */
export const DominicanFlagIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 24"
    className={className}
    {...props}
  >
    <rect width="32" height="24" fill="#FFFFFF" />
    <rect width="14" height="10" fill="#002D62" x="0" y="0" />
    <rect width="14" height="10" fill="#CE1126" x="18" y="0" />
    <rect width="14" height="10" fill="#CE1126" x="0" y="14" />
    <rect width="14" height="10" fill="#002D62" x="18" y="14" />
    <rect width="2" height="2" fill="#007A33" x="15" y="11" />
  </svg>
);

/**
 * USA Flag Icon
 * A simplified version with stars and stripes.
 */
export const USAFlagIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 24"
    className={className}
    {...props}
  >
    <rect width="32" height="24" fill="#FFFFFF" />
    <rect width="32" height="2" fill="#B22234" y="0" />
    <rect width="32" height="2" fill="#B22234" y="4" />
    <rect width="32" height="2" fill="#B22234" y="8" />
    <rect width="32" height="2" fill="#B22234" y="12" />
    <rect width="32" height="2" fill="#B22234" y="16" />
    <rect width="32" height="2" fill="#B22234" y="20" />
    <rect width="14" height="11" fill="#3C3B6E" />
    <circle cx="2" cy="2" r="0.5" fill="#FFFFFF" />
    <circle cx="5" cy="2" r="0.5" fill="#FFFFFF" />
    <circle cx="8" cy="2" r="0.5" fill="#FFFFFF" />
    <circle cx="11" cy="2" r="0.5" fill="#FFFFFF" />
    <circle cx="3.5" cy="4" r="0.5" fill="#FFFFFF" />
    <circle cx="6.5" cy="4" r="0.5" fill="#FFFFFF" />
    <circle cx="9.5" cy="4" r="0.5" fill="#FFFFFF" />
    <circle cx="2" cy="6" r="0.5" fill="#FFFFFF" />
    <circle cx="5" cy="6" r="0.5" fill="#FFFFFF" />
    <circle cx="8" cy="6" r="0.5" fill="#FFFFFF" />
    <circle cx="11" cy="6" r="0.5" fill="#FFFFFF" />
    <circle cx="3.5" cy="8" r="0.5" fill="#FFFFFF" />
    <circle cx="6.5" cy="8" r="0.5" fill="#FFFFFF" />
    <circle cx="9.5" cy="8" r="0.5" fill="#FFFFFF" />
  </svg>
);
