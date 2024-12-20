function UnFavoriteIcons({ color = "#C5270E", size = "24" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.10999 17.5001C3.89999 15.4301 2 12.4801 2 8.68005C2 5.59005 4.49 3.09009 7.56 3.09009C9.38 3.09009 10.99 3.97008 12 5.33008C13.01 3.97008 14.63 3.09009 16.44 3.09009C17.59 3.09009 18.66 3.44005 19.55 4.05005"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.74 7C21.91 7.53 22 8.1 22 8.69C22 15.69 15.52 19.82 12.62 20.82C12.28 20.94 11.72 20.94 11.38 20.82C10.73 20.6 9.91002 20.22 9.02002 19.69"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L2 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UnFavoriteIcons;
