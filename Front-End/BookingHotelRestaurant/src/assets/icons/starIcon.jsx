// StarIcon.js
function StarIcon({
  color = "FFD700",
  size = "24",
  outline = false,
  fill,
  onClick,
}) {
  return (
    <svg
      width={size}
      height={size}
      fill={fill || (outline ? "none" : color)} // Nếu có `fill` sẽ dùng, nếu không thì dùng `outline`
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick} // Khi click vào sao
    >
      <path
        d="M13.73 3.51001L15.49 7.03001C15.73 7.52002 16.37 7.99001 16.91 8.08001L20.1 8.61001C22.14 8.95001 22.62 10.43 21.15 11.89L18.67 14.37C18.25 14.79 18.02 15.6 18.15 16.18L18.86 19.25C19.42 21.68 18.13 22.62 15.98 21.35L12.99 19.58C12.45 19.26 11.56 19.26 11.01 19.58L8.02 21.35C5.88 22.62 4.58 21.67 5.14 19.25L5.85 16.18C5.98 15.6 5.75 14.79 5.33 14.37L2.85 11.89C1.39 10.43 1.86 8.95001 3.9 8.61001L7.09 8.08001C7.62 7.99001 8.26 7.52002 8.5 7.03001L10.26 3.51001C11.22 1.60001 12.78 1.60001 13.73 3.51001Z"
        stroke={outline ? color : "none"} // Nếu outline = true, sao có viền màu
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default StarIcon;
