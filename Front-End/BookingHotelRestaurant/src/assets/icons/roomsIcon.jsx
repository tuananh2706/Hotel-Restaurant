function RoomIcon({ color = "#007e47", size = "24" }) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 -0.5 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="si-glyph si-glyph-bed"
    >
      <title>Room Icon</title>
      <defs></defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(1.000000, 5.000000)" fill={color}>
          <path
            d="M15.031,2.016 L15.031,3.031 L1.938,3.031 L1.938,0.078 L0.009,0.078 L0.009,3.031 L0.009,5.246 L0.009,5.971 L1.938,5.971 L1.938,4.938 L15.031,4.938 L15.031,5.971 L15.969,5.971 L15.969,2.016 L15.031,2.016 Z"
            className="si-glyph-fill"
          ></path>
          <ellipse
            cx="3.985"
            cy="0.97"
            rx="0.985"
            ry="0.97"
            className="si-glyph-fill"
          ></ellipse>
          <path
            d="M13.991,1.998 L6.013,1.998 L6.013,1.132 C6.013,0.534 6.656,0.049 7.447,0.049 L12.556,0.049 C13.349,0.049 13.991,0.534 13.991,1.132 L13.991,1.998 L13.991,1.998 Z"
            className="si-glyph-fill"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default RoomIcon;
