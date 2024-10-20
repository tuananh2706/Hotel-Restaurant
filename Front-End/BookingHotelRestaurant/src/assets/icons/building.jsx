function BuildingIcon({ color = "#004225", size = "24" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 22H4.07997C2.91997 22 1.96997 21.07 1.96997 19.93V5.09C1.96997 2.47 3.91997 1.28 6.30997 2.45L10.75 4.63C11.71 5.1 12.5 6.35 12.5 7.41V22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.97 15.06V18.84C21.97 21 20.97 22 18.81 22H12.5V10.42L12.97 10.52L17.47 11.53L19.5 11.98C20.82 12.27 21.9 12.95 21.96 14.87C21.97 14.93 21.97 14.99 21.97 15.06Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 9H8.97"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 13H8.97"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.47 11.53V14.75C17.47 15.99 16.46 17 15.22 17C13.98 17 12.97 15.99 12.97 14.75V10.52L17.47 11.53Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.96 14.87C21.9 16.05 20.92 17 19.72 17C18.48 17 17.47 15.99 17.47 14.75V11.53L19.5 11.98C20.82 12.27 21.9 12.95 21.96 14.87Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BuildingIcon;
